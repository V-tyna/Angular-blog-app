import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';
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

  @Input() public post!: Post;

  public createComment!: FormGroup;
  private commentSubscription?: Subscription;

  constructor(
    private commentsService: CommentsService,
    public auth: AuthService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.createComment = new FormGroup({
      author: new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required),
      follow: new FormControl(null)
    })  
  }

  submit() {
    const comment: Comment = {
      author: this.createComment.value.author,
      comment: this.createComment.value.comment,
      follow: this.createComment.value.follow,
      date: new Date()
    }
    
    this.commentSubscription = this.commentsService.createComment(comment, this.post.id!, this.post.title)
    .subscribe((newComment) => {
      const comments = this.commentsService.comments$.getValue();
      this.commentsService.comments$.next([...comments, newComment]);
      this.createComment.reset();
      this.alert.success('Comment was added.');
    })
    
  }

  ngOnDestroy(): void {
      this.commentSubscription?.unsubscribe();
  }

}
