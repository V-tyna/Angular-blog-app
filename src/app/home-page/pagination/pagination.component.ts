import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() public pageIndex!: number;
  @Input() public currentPageIndex!: number;
  @Input() public numberOfPages!: number;
  @Input() public POSTS_PER_PAGE!: number;
  //@ts-ignore
  @Output() public slicedPosts = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  nextPage() {
    if(this.pageIndex + 1 >= this.numberOfPages) return;
     let pageIndex = ++this.pageIndex;
     let lastElem = (pageIndex + 1) * this.POSTS_PER_PAGE;
     let firstElem = pageIndex * this.POSTS_PER_PAGE;
     const arrToEmit = [pageIndex, firstElem, lastElem]
      this.slicedPosts.emit(arrToEmit);
  }

  previousPage() {
    if(this.pageIndex <= 0) return;
    let pageIndex = --this.pageIndex;
    let lastElem = (pageIndex + 1) * this.POSTS_PER_PAGE;
    let firstElem = pageIndex * this.POSTS_PER_PAGE;
    const arrToEmit = [pageIndex, firstElem, lastElem]
     this.slicedPosts.emit(arrToEmit);
  }

}
