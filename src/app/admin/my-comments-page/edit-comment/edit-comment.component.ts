import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/shared/interfaces';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit, OnDestroy {

  public formEditComment?: FormGroup;
  public submitted: boolean = false;
  public comment!: Comment;
  private editCommentSubscription?: Subscription;
  private getCommentSubscription?: Subscription;

  constructor(
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getCommentSubscription = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.commentsService.getCommentById(params['title'], params['id']);
      })
    ).subscribe((comment: Comment) => {
      this.comment = comment;

      this.formEditComment = new FormGroup({
        author: new FormControl(comment.author, Validators.required),
        comment: new FormControl(comment.comment, Validators.required)
      })
    })
  }

  submitEditComment() {
    if(this.formEditComment?.invalid) return;

    this.submitted = true;
    const newComment = {
      ...this.comment,
      author: this.formEditComment?.value.author,
      comment: this.formEditComment?.value.comment
    }

    this.editCommentSubscription = this.commentsService.editComment(newComment).subscribe(() => {
      this.submitted = false;
      this.alert.success('Comment was updated.');
    });

  }

  ngOnDestroy(): void {
    this.editCommentSubscription?.unsubscribe();
    this.getCommentSubscription?.unsubscribe();
  }

}
