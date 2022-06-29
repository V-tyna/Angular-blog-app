import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/admin/shared/services/alert.service';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';

import { Comment, Post } from '../../interfaces';

@Component({
  selector: 'app-post-create-comment',
  templateUrl: './post-create-comment.component.html',
  styleUrls: ['./post-create-comment.component.scss']
})
export class PostCreateCommentComponent implements OnInit, OnDestroy {
  @Input() public post: Post;

  public isAuthenticated: boolean;
  public createComment: FormGroup;
  private commentSubscription: Subscription;
  private uid: string | null = localStorage.getItem('localId');

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
    private alert: AlertService
  ) { }

  public ngOnInit(): void {
    this.createComment = new FormGroup({
      authorName: new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required),
      isFollowed: new FormControl(false)
    });
  }

  public ngAfterContentChecked(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  public submit(): void {

    const { authorName, comment, isFollowed } = this.createComment.value;

    const newComment: Comment = {
      authorName,
      comment,
      isFollowed: isFollowed || false,
      date: new Date(),
      uid: this.uid || '',
      postTitle: this.post.title
    };

    this.commentSubscription = this.commentsService.createComment(newComment, this.post.title)
      .subscribe((returnedNewComment: Comment) => {
        const comments = this.commentsService.comments$.getValue();
        this.commentsService.comments$.next([...comments, returnedNewComment]);
        this.createComment.reset();
        this.alert.success('Comment was added.');
        this.commentsService.writeCommentId(returnedNewComment).subscribe();
      });
  }

  public ngOnDestroy(): void {
    this.commentSubscription?.unsubscribe();
  }
}
