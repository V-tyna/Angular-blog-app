import { Component, OnDestroy, OnInit} from '@angular/core';
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

  public posts?: Post[];
  public currentPosts?: Post[];
  public pageIndex: number = 0;
  public currentPageIndex: number = 0;
  public numberOfPages: number = 0;
  public POSTS_PER_PAGE: number = 5;
  private postSubscription?: Subscription;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postSubscription = this.postsService.getAllPosts().subscribe((posts) => {
      const sortedPosts = sortByDate([...posts]);
      this.posts = sortedPosts;
      if(!this.currentPosts) {
        this.currentPosts = this.posts.slice(0, 5);
      }
      if(this.posts) {
        this.numberOfPages = Math.ceil(this.posts.length / this.POSTS_PER_PAGE);
      }
    });
  }

  ngOnDestroy(): void {
    this.postSubscription?.unsubscribe();
  }

  getParamsForPagination(arrToEmit: Array<number>) {  
    this.currentPageIndex = arrToEmit[0];
    const start = arrToEmit[1];
    const end = arrToEmit[2];
    if(this.posts && end - this.POSTS_PER_PAGE >= this.posts.length) return;
    this.currentPosts = this.posts?.slice(start, end);
  }

}
