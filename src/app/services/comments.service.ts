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
  private uid: string | null = localStorage.getItem('localId');

  constructor(private http: HttpClient) {
  }

  createComment(comment: Comment, title: string) {
    return this.http.post<Comment>(`${environment.fbDbUrl}/comments//${title}.json`, comment)
      //@ts-ignore
      .pipe(map((response: FbCreateResponse) => {
        const newComment = {
          ...comment,
          id: response.name,
          date: new Date(comment.date)
        };
        return newComment;
      }));
  }

  writeCommentId(commentWithId: Comment) {
    return this.http.patch<Comment>(`${environment.fbDbUrl}/comments/${commentWithId.postTitle}/${commentWithId.id}.json`, commentWithId);
  }

  getAllComments(title: string): Observable<any> {
    return this.http.get(`${environment.fbDbUrl}/comments/${title}.json`)
      .pipe(map((res) => {
        if (!res) return;
        const comments = Object.values(res);
        this.comments$.next(comments);
        console.log('Comments all ever: ', res);

        return comments;
      }));
  }

  getAllUserComments() {
    return this.http.get(`${environment.fbDbUrl}/comments.json`).pipe(
      map(res => {

        const result: Array<any> = [];
        Object.values(res).map(val => (Object.values(val).map(obj => result.push(obj))));

        return result.filter(obj => obj.uid === this.uid)
      }
      )
    )

  }

  removeComment(postTitle: string, commentId: string) {
    return this.http.delete(`${environment.fbDbUrl}/comments/${postTitle}/${commentId}.json`);
  }

}