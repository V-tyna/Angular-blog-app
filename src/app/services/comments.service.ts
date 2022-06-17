import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Comment } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  public comments$ = new BehaviorSubject<Comment[]>([]);

  constructor(private http: HttpClient) {
  }

  createComment(comment: Comment, id: string, title: string) {
    return this.http.post<Comment>(`${environment.fbDbUrl}/comments/${id}/${title}.json`, comment)
      //@ts-ignore
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...comment,
          id: response.name,
          date: new Date(comment.date)
        };
      }));
  }

  getAllComments(id: string, title: string): Observable<any> {
    return this.http.get(`${environment.fbDbUrl}/comments/${id}/${title}.json`)
      .pipe(map((res: { [key: string]: any }) => {
        if (!res) return;
        const comments = Object.keys(res).map(key => {
          return {
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }
        });
        this.comments$.next(comments);
        return comments;
      }));
  }

}