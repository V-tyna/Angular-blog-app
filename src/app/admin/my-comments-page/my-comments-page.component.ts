import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { sortByDate } from 'src/app/shared/helpers/sortByDate';
import { Comment } from 'src/app/shared/interfaces';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-my-comments-page',
  templateUrl: './my-comments-page.component.html',
  styleUrls: ['./my-comments-page.component.scss']
})
export class MyCommentsPageComponent implements OnInit, OnChanges, OnDestroy {

  public comments?: Comment[];
  private userCommentsSubscription?: Subscription;
  private removeCommentSubscription?: Subscription;

  constructor(
    private commentsService: CommentsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.comments = [];
    this.userCommentsSubscription = this.commentsService.getAllUserComments().subscribe(comments => {
      this.comments = sortByDate(comments);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userCommentsSubscription = this.commentsService.getAllUserComments().subscribe(comments => {
      this.comments = sortByDate(comments);
    });
  }

  removeComment(title: string, id: string) {
    this.removeCommentSubscription = this.commentsService.removeComment(title, id).subscribe(() => {
      this.comments = this.comments?.filter(comment => comment.id !== id);
      this.alert.danger('Comment was deleted.');
    });
  }

  ngOnDestroy(): void {
    this.userCommentsSubscription?.unsubscribe();
    this.removeCommentSubscription?.unsubscribe();
  }

}
