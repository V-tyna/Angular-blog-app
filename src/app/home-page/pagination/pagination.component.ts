import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  public pages: number[] = [];
  public currentButtons: number[] = [];
  public pageIndex: number = 0;
  public POSTS_PER_PAGE: number = 5;
  public THREE_BUTTONS = 3;

  @Input() public postsLength: number = 0;
  @Input() public numberOfPages: number = 0;
  @Output() public slicedPosts = new EventEmitter<number[]>();

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.currentButtons.length) {
      this.countPages();
      this.sliceButtonsNextPage(0);
    }
  }

  public nextPage() {
    if (this.pageIndex >= this.numberOfPages - 1) { return; }
    this.pageIndex++;
    const lastElem = (this.pageIndex + 1) * this.POSTS_PER_PAGE;
    const firstElem = this.pageIndex * this.POSTS_PER_PAGE;
    const arrToEmit = [firstElem, lastElem, this.POSTS_PER_PAGE];
    this.slicedPosts.emit(arrToEmit);
    if (this.pageIndex > this.numberOfPages - this.THREE_BUTTONS) {
      this.sliceButtonsNextPage(this.numberOfPages - this.THREE_BUTTONS);
    } else {
      this.sliceButtonsNextPage(this.pageIndex);
    }
  }

  public previousPage() {
    if (this.pageIndex <= 0) { return; }
    this.pageIndex--;
    const lastElem = (this.pageIndex + 1) * this.POSTS_PER_PAGE;
    const firstElem = this.pageIndex * this.POSTS_PER_PAGE;
    const arrToEmit = [firstElem, lastElem, this.POSTS_PER_PAGE];
    this.slicedPosts.emit(arrToEmit);
    if (this.pageIndex < this.THREE_BUTTONS) {
      this.sliceButtonsPreviousPage(2);
    } else {
      this.sliceButtonsPreviousPage(this.pageIndex);
    }
  }

  public getPage(page: number) {
    this.pageIndex = page;
    const lastElem = (page + 1) * this.POSTS_PER_PAGE;
    const firstElem = page * this.POSTS_PER_PAGE;
    const arrToEmit = [firstElem, lastElem, this.POSTS_PER_PAGE];
    this.slicedPosts.emit(arrToEmit);
  }

  public nextButtons() {
    if (this.currentButtons[2] >= this.numberOfPages - this.THREE_BUTTONS) {
      this.currentButtons = this.pages.slice(this.numberOfPages - this.THREE_BUTTONS, this.numberOfPages);
    } else {
      this.currentButtons[2] = this.currentButtons[2] + 1;
      this.currentButtons = this.pages.slice(this.currentButtons[2], this.currentButtons[2] + this.THREE_BUTTONS);
    }
  }

  public previousButtons() {
    if (this.currentButtons[0] < this.THREE_BUTTONS) {
      this.currentButtons = this.pages.slice(0, this.THREE_BUTTONS);
    } else {
      this.currentButtons = this.pages.slice(this.currentButtons[0] - this.THREE_BUTTONS, this.currentButtons[0]);
    }
  }

  public setPostPerPage(event: Event) {
    this.POSTS_PER_PAGE = +(<HTMLInputElement> event.target).value;
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

  private countPages(): number[] {
    this.pages = [];
    for (let i = 0; i < this.numberOfPages; i++) {
      this.pages.push(i);
    }
    return this.pages;
  }

  private sliceButtonsNextPage(currentPosition: number) {
    if (this.currentButtons.includes(this.pageIndex)) { return; }
    this.currentButtons = this.pages.slice(currentPosition, currentPosition + this.THREE_BUTTONS);
  }

  private sliceButtonsPreviousPage(currentPosition: number) {
    if (this.currentButtons.includes(this.pageIndex)) { return; }
    currentPosition++;
    this.currentButtons = this.pages.slice(currentPosition - this.THREE_BUTTONS, currentPosition);
  }
}
