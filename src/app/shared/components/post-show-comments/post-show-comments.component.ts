import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';

import { sortByDate } from '../../helpers/sortByDate';
import { Post } from '../../interfaces';
import { Comment } from '../../interfaces';
export { sortByDate } from '../../helpers/sortByDate';

@Component({
  selector: 'app-post-show-comments',
  templateUrl: './post-show-comments.component.html',
  styleUrls: ['./post-show-comments.component.scss']
})
export class PostShowCommentsComponent implements OnDestroy, OnChanges {

  @Input() public post: Post;

  public comments: Comment[] = [];
  private commentsSubscription: Subscription;
  private commentsArraySubscription: Subscription;

  constructor(private commentsService: CommentsService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    this.commentsSubscription = this.commentsService.getAllComments(this.post.title).subscribe();

    this.commentsArraySubscription = this.commentsService.comments$.subscribe((comments: Comment[]) => {
      this.comments = sortByDate(comments);
    });
  }

  public ngOnDestroy(): void {
    this.commentsSubscription?.unsubscribe();
    this.commentsArraySubscription?.unsubscribe();
  }
}
