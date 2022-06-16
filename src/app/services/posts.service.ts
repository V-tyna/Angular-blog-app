import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FbCreateResponse, Post } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post>{
    const uid = localStorage.getItem('localId');
    return this.http.post<Post>(`${environment.fbDbUrl}/posts/${uid}.json`, post)
      //@ts-ignore
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };
      }));
  }

  getAllPosts(): Observable<Post[]>  { 
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((res: {[key: string]: any}) => {
        const result: Array<Post> = [];
        const data = Object.values(res);
        const keys = Object.keys(res);
          
        data.forEach((arr, i) => Object.values(arr).forEach(obj => {
          //@ts-ignore
          obj.id = keys[i];
          //@ts-ignore
          return result.push(obj)
        }))
    
        return result;
      }));
  }

  getAllUsersPosts(): Observable<Post[]> {
    const uid = localStorage.getItem('localId');
    return this.http.get(`${environment.fbDbUrl}/posts/${uid}.json`)
      .pipe(map((res: {[key: string]: any}) => {
        return Object.keys(res).map( key => {
          return {
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }
        });
      }));
  }

  getPostById(id: string, title: string): Observable<Post> {
    //@ts-ignore
    return this.http.get<Post>(`${environment.fbDbUrl}/posts.json`)
      //@ts-ignore
      .pipe(map((res: {[key: string]: any})=> {
        const result: Array<Post> = [];
        const data = Object.values(res);
        const keys = Object.keys(res);
          
        data.forEach((arr, i) => Object.values(arr).forEach(obj => {
          //@ts-ignore
          obj.id = keys[i];
          //@ts-ignore
          return result.push(obj)
        }))        
      //@ts-ignore
        return result.find(obj => obj.id === id && obj.title === title);
      }));
  }

  removePost(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }

  updatePost(post: Post) {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
  }
}