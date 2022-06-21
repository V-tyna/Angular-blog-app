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

  createComment(comment: Comment, title: string): Observable<Comment> {
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

  writeCommentId(commentWithId: Comment): Observable<Comment> {
    return this.http.patch<Comment>(`${environment.fbDbUrl}/comments/${commentWithId.postTitle}/${commentWithId.id}.json`, commentWithId);
  }

  getAllComments(title: string): Observable<Comment[] | undefined> {
    return this.http.get<Comment>(`${environment.fbDbUrl}/comments/${title}.json`)
      .pipe(map((res:  Comment) => {
        if (!res) return;
        const comments: Comment[] = Object.values(res);
        this.comments$.next(comments);

        return comments;
      }));
  }

  getAllUserComments(): Observable<Comment[]>  {
    return this.http.get(`${environment.fbDbUrl}/comments.json`).pipe(
      map(res => {
        if(!res) return [];
        const result: Array<Comment> = [];
        Object.values(res).map(val => (Object.values(val).map((obj: any) => result.push(obj))));
        const userComments = result.filter(obj => obj.uid === this.uid);

        return userComments;
      }));
  }

  getCommentById(postTitle: string, id: string): Observable<Comment> {
    console.log('Post by id response: ', this.http.get<Comment>(`${environment.fbDbUrl}/comments/${postTitle}/${id}.json`).subscribe(res => console.log(res)
    ));
    
    return this.http.get<Comment>(`${environment.fbDbUrl}/comments/${postTitle}/${id}.json`);
  }

  editComment(comment: Comment,): Observable<Comment> {
    return this.http.patch<Comment>(`${environment.fbDbUrl}/comments/${comment.postTitle}/${comment.id}.json`, comment);
  }

  removeComment(postTitle: string, commentId: string): Observable<Comment>  {
    return this.http.delete<Comment>(`${environment.fbDbUrl}/comments/${postTitle}/${commentId}.json`);
  }

}