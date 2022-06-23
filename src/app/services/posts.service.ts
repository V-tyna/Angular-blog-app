import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  private uid: string | null = localStorage.getItem('localId');

  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post>{
    return this.http.post<Post>(`${environment.fbDbUrl}/posts/${this.uid}.json`, post)
      .pipe(map((response: Post) => {
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
        if(!res) return [];

        const {result, data, keys} = this.getDataHelper(res);

        data.forEach((arr: {key: Post}, i: number) => Object.values(arr).forEach((obj: Post) => {
          obj.id = keys[i];
          return result.push(obj)
        }))

        return result;
      }));
  }

  getAllUsersPosts(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts/${this.uid}.json`)
      .pipe(map((res: {[key: string]: any}) => {
        if(!res) return [];
        return Object.keys(res).map( key => {
          return {
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }
        });
      }));
  }

  getPostById(id: string, title: string): Observable<Post | undefined> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((res: Post)=> {
        if(!res) return;

        const {result, data, keys} = this.getDataHelper(res);

        data.forEach((arr: {key: Post}, i: number) => Object.values(arr).forEach((obj: Post)=> {
          obj.id = keys[i];
          return result.push(obj);
        }))

        return result.find(obj => obj.id === id && obj.title === title);
      }));
  }

  getUserPostById(id: string): Observable<Post | undefined> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${this.uid}/${id}.json`)
      .pipe(map((res: Post)=> {
        if(!res) return;
        return res;
      }));
  }

  removePost(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${this.uid}/${id}.json`);
  }

  updatePost(id: string, post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${this.uid}/${id}.json`, post);
  }

  getDataHelper(res: Post | {[key: string]: any}) {
    const result: Post[] = [];
    const data: {key: Post}[]= Object.values(res);
    const keys: string[] = Object.keys(res);
    return {result, data, keys};
  }

}
