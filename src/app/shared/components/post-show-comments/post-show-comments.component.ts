import { AfterContentChecked, Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';

import { sortByDate } from '../../helpers/sortByDate';
import { Post } from '../../interfaces';
import { Comment } from '../../interfaces';
export { sortByDate } from '../../helpers/sortByDate';

@Component({
  selector: 'app-post-show-comments',
  templateUrl: './post-show-comments.component.html'
})
export class PostShowCommentsComponent implements OnDestroy, AfterContentChecked {

  @Input() public post: Post;

  public comments: Comment[] = [];
  private commentsSubscription: Subscription;
  private commentsArraySubscription: Subscription;

  constructor(private commentsService: CommentsService) { }

  public ngAfterContentChecked(): void {
    this.commentsSubscription = this.commentsService.getAllComments(this.post.title).subscribe();

    this.commentsArraySubscription = this.commentsService.comments$.subscribe((comments: Comment[]) => {
      this.comments = sortByDate(comments);
    });
  }

  public trackByFn(index: number, comment: Comment): string {
    return comment.id + comment.authorName;
  }

  public ngOnDestroy(): void {
    this.commentsSubscription?.unsubscribe();
    this.commentsArraySubscription?.unsubscribe();
  }
}
