import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-my-comments-page',
  templateUrl: './my-comments-page.component.html',
  styleUrls: ['./my-comments-page.component.scss']
})
export class MyCommentsPageComponent implements OnInit, OnChanges, OnDestroy {

  public comments?: Comment[];
  private userCommentsSubscription?: Subscription;
  private removeSubscription?: Subscription;

  constructor(
    private commentsService: CommentsService
  ) { }

  ngOnInit(): void {
    this.comments = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.userCommentsSubscription = this.commentsService.getAllUserComments().subscribe(comments => {     
      this.comments = comments;
    });
  }

  removeComment(title: string, id: string) { 
    this.removeSubscription = this.commentsService.removeComment(title, id).subscribe();
  }

  editComment(id:string) {

  }

  ngOnDestroy(): void {
      this.userCommentsSubscription?.unsubscribe();
      this.removeSubscription?.unsubscribe();
  }

}
