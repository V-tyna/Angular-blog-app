import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';

import { PostsService } from '../../services/posts.service';
import { sortByDate } from '../../shared/helpers/sortByDate';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public searchStr: string = '';
  private postsSubscription: Subscription;
  private removePostSubscription: Subscription;

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  public ngOnInit(): void {
    this.postsSubscription = this.postsService.getAllUsersPosts().subscribe((posts: Post[]) => {
      this.posts = sortByDate(posts);
    });
  }

  public removePost(id: string | undefined) {
    this.removePostSubscription = this.postsService.removePost(id).subscribe(() => {
      this.posts = this.posts.filter((post: Post) => post.id !== id);
      this.alert.danger('Post was deleted.');
    });
  }

  public trackByFn(index: number, post: Post): string {
    return post.title + post.author;
  }

  public ngOnDestroy(): void {
    this.postsSubscription?.unsubscribe();
    this.removePostSubscription?.unsubscribe();
  }
}
