import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FbCreateResponse, Post } from './interfaces';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post>{
    return this.http.post<Post>(`${environment.fbDbUrl}/posts.json`, post)
      //@ts-ignore
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };
      }));
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
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

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      //@ts-ignore
      .pipe(map((post: Post) => {
        return {
          ...post,
          id: id,
          date: new Date(post.date)
        };
      }));
  }

  removePost(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }

  updatePost(post: Post) {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
  }
}