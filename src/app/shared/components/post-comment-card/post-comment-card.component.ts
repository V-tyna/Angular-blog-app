import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-comment-card',
  templateUrl: './post-comment-card.component.html',
  styleUrls: ['./post-comment-card.component.scss']
})
export class PostCommentCardComponent implements OnInit {

  @Input() public commentC?: any;

  constructor() { }

  ngOnInit(): void { 
  }

}
