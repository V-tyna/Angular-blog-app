import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() postC!: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
