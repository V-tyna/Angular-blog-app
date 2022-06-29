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

  public getAllComments(title: string): Observable<Comment[] | undefined> {
    return this.http.get<Comment>(`${environment.fbDbUrl}/comments/${title}.json`)
      .pipe(map((res: Comment) => {
        if (!res) { return; }
        const comments: Comment[] = Object.values(res);
        this.comments$.next(comments);

        return comments;
      }));
  }

  public getAllUserComments(): Observable<Comment[]> {
    return this.http.get(`${environment.fbDbUrl}/comments.json`).pipe(
      map((res) => {
        if (!res) { return []; }

        const result: Comment[] = [];
        Object.values(res).map((val: Comment[]) => (Object.values(val).map((obj: Comment) => result.push(obj))));
        const userComments = result.filter((obj: Comment) => obj.uid === this.uid);

        return userComments;
      }));
  }

  public getCommentById(postTitle: string, id: string): Observable<Comment> {
    return this.http.get<Comment>(`${environment.fbDbUrl}/comments/${postTitle}/${id}.json`);
  }

  public createComment(comment: Comment, title: string): Observable<Comment> {
    return this.http.post<Comment>(`${environment.fbDbUrl}/comments//${title}.json`, comment)
      .pipe(map((response: Comment) => {
        return {
          ...comment,
          id: response.name,
          date: new Date(comment.date)
        };
      }));
  }

  public writeCommentId(commentWithId: Comment): Observable<Comment> {
    return this.http.patch<Comment>(`${environment.fbDbUrl}/comments/${commentWithId.postTitle}/${commentWithId.id}.json`, commentWithId);
  }

  public editComment(comment: Comment): Observable<Comment> {
    return this.http.patch<Comment>(`${environment.fbDbUrl}/comments/${comment.postTitle}/${comment.id}.json`, comment);
  }

  public removeComment(postTitle: string, commentId: string): Observable<Comment> {
    return this.http.delete<Comment>(`${environment.fbDbUrl}/comments/${postTitle}/${commentId}.json`);
  }
}
