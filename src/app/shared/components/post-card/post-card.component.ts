import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() public postC!: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
