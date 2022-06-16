import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, Subscription, tap } from 'rxjs';
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

  constructor(private commentsService: CommentsService,
    public auth: AuthService) {
   }

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
    console.log('Comment: ', comment);

    this.commentSubscription = this.commentsService.createComment(comment, this.post.id!, this.post.title)
    .subscribe(() => {
      this.createComment.reset();
    })
    
  }

  ngOnDestroy(): void {
      this.commentSubscription?.unsubscribe();
  }

}
