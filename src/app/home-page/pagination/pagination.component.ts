import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  public pages: number[] = [];
  public currentButtons: number[] = [];
  public POSTS_PER_PAGE: number = 5;
  public pageIndex: number = 0;
  @Input() public postsLength: number = 0;
  @Input() public numberOfPages: number = 0;
  @Output() public slicedPosts = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.currentButtons.length) {
      this.countPages();
      this.sliceButtonsNextPage(0);
    }
  }

  countPages(): number[] {
    this.pages = [];
    for (let i = 0; i < this.numberOfPages; i++) {
      this.pages.push(i);
    }
    return this.pages;
  }

  sliceButtonsNextPage(currentPosition: number) {
    if (this.currentButtons.includes(this.pageIndex)) return;
    this.currentButtons = this.pages.slice(currentPosition, currentPosition + 3);
  }

  sliceButtonsPreviousPage(currentPosition: number) {
    if (this.currentButtons.includes(this.pageIndex)) return;
    currentPosition++;
    this.currentButtons = this.pages.slice(currentPosition - 3, currentPosition);
  }


  nextPage() {
    if (this.pageIndex >= this.numberOfPages - 1) return;
    this.pageIndex++;
    const lastElem = (this.pageIndex + 1) * this.POSTS_PER_PAGE;
    const firstElem = this.pageIndex * this.POSTS_PER_PAGE;
    const arrToEmit = [firstElem, lastElem, this.POSTS_PER_PAGE];
    this.slicedPosts.emit(arrToEmit);
    if (this.pageIndex > this.numberOfPages - 3) {
      this.sliceButtonsNextPage(this.numberOfPages - 3);
    } else {
      this.sliceButtonsNextPage(this.pageIndex);
    }
  }

  previousPage() {
    if (this.pageIndex <= 0) return;
    this.pageIndex--;
    const lastElem = (this.pageIndex + 1) * this.POSTS_PER_PAGE;
    const firstElem = this.pageIndex * this.POSTS_PER_PAGE;
    const arrToEmit = [firstElem, lastElem, this.POSTS_PER_PAGE];
    this.slicedPosts.emit(arrToEmit);
    if (this.pageIndex < 3) {
      this.sliceButtonsPreviousPage(2);
    } else {
      this.sliceButtonsPreviousPage(this.pageIndex);
    }
  }

  getPage(page: number) {
    this.pageIndex = page;
    const lastElem = (page + 1) * this.POSTS_PER_PAGE;
    const firstElem = page * this.POSTS_PER_PAGE;
    const arrToEmit = [firstElem, lastElem, this.POSTS_PER_PAGE];
    this.slicedPosts.emit(arrToEmit);
  }

  nextButtons() {
    if (this.currentButtons[2] >= this.numberOfPages - 3) {
      this.currentButtons = this.pages.slice(this.numberOfPages - 3, this.numberOfPages);
    } else {
      this.currentButtons[2] = this.currentButtons[2] + 1;
      this.currentButtons = this.pages.slice(this.currentButtons[2], this.currentButtons[2] + 3);
    }
  }

  previousButtons() {
    if (this.currentButtons[0] < 3) {
      this.currentButtons = this.pages.slice(0, 3);
    } else {
      this.currentButtons = this.pages.slice(this.currentButtons[0] - 3, this.currentButtons[0]);
    }
  }

  setPostPerPage(event: Event) {
    this.POSTS_PER_PAGE = +(event.target as HTMLInputElement).value;
    this.numberOfPages = Math.ceil(this.postsLength / this.POSTS_PER_PAGE);
    this.pageIndex = 0;
    this.pages = this.countPages();
    this.currentButtons = [];

    this.sliceButtonsNextPage(0);

    const lastElem = (this.pageIndex + 1) * this.POSTS_PER_PAGE;
    const firstElem = this.pageIndex * this.POSTS_PER_PAGE;

    const arrToEmit = [firstElem, lastElem, this.POSTS_PER_PAGE, this.numberOfPages];
    this.slicedPosts.emit(arrToEmit);
  }
}
