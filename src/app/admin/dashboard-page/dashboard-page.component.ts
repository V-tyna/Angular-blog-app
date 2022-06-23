import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { AlertService } from '../shared/services/alert.service';
import { sortByDate } from 'src/app/shared/helpers/sortByDate';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public searchStr: string = '';
  private postsSubscription?: Subscription;
  private removePostSubscription?: Subscription;

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.postsSubscription = this.postsService.getAllUsersPosts().subscribe((posts) => {
      this.posts = sortByDate(posts);
    })
  }

  removePost(id: string | undefined) {
    this.removePostSubscription = this.postsService.removePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.danger('Post was deleted.');
    }
    );
  }

  ngOnDestroy(): void {
    this.postsSubscription?.unsubscribe();
    this.removePostSubscription?.unsubscribe();
  }
}
