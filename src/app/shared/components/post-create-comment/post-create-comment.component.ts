import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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

  public createComment!: FormGroup;
  private commentSubscription?: Subscription;
  private uid: string | null = localStorage.getItem('localId');
  @Input() public post!: Post;

  constructor(
    private commentsService: CommentsService,
    public auth: AuthService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.createComment = new FormGroup({
      author: new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required),
      follow: new FormControl(false)
    })
  }

  submit() {
    const comment: Comment = {
      author: this.createComment.value.author,
      comment: this.createComment.value.comment,
      follow: this.createComment.value.follow || false,
      date: new Date(),
      uid: this.uid || '',
      postTitle: this.post.title
    }

    this.commentSubscription = this.commentsService.createComment(comment, this.post.title)
    .subscribe((newComment: Comment) => {
      const comments = this.commentsService.comments$.getValue();
      this.commentsService.comments$.next([...comments, newComment]);
      this.createComment.reset();
      this.alert.success('Comment was added.');
      this.commentsService.writeCommentId(newComment).subscribe();
    });
  }

  ngOnDestroy(): void {
      this.commentSubscription?.unsubscribe();
  }

}
