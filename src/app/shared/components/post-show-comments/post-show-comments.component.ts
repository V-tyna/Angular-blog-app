import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { Post } from '../../interfaces';
import { Comment } from '../../interfaces';

@Component({
  selector: 'app-post-show-comments',
  templateUrl: './post-show-comments.component.html',
  styleUrls: ['./post-show-comments.component.scss']
})
export class PostShowCommentsComponent implements OnInit, OnDestroy {

  @Input() public post!: Post;

  private commentsSubscription?: Subscription;
  public comments?: Comment[];

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.getAllComments(this.post.id!, this.post.title).subscribe();

    this.commentsService.comments$.subscribe((comments: Comment[]) => { 
      this.comments = comments;
    })
    }

  ngOnDestroy(): void {
    this.commentsSubscription?.unsubscribe();
  }

}
