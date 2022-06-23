import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../shared/interfaces';
import { PostsService } from '../services/posts.service';
import { sortByDate } from '../shared/helpers/sortByDate';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  public posts: Post[] = [];
  public currentPosts: Post[] = [];
  public numberOfPages: number = 0;
  public POSTS_PER_PAGE: number = 5;
  private postSubscription?: Subscription;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postSubscription = this.postsService.getAllPosts().subscribe((posts) => {
      this.posts = sortByDate(posts);
      this.currentPosts = this.posts.slice(0, 5);
      if (this.posts.length) {
        this.numberOfPages = Math.ceil(this.posts.length / this.POSTS_PER_PAGE);
      }
    });
  }

  ngOnDestroy(): void {
    this.postSubscription?.unsubscribe();
  }

  getParamsForPagination(arrToEmit: Array<number>) {
    const start = arrToEmit[0];
    const end = arrToEmit[1];
    this.POSTS_PER_PAGE = arrToEmit[1];
    if (this.posts && end - this.POSTS_PER_PAGE >= this.posts.length) return;
    this.currentPosts = this.posts?.slice(start, end);
  }

}
