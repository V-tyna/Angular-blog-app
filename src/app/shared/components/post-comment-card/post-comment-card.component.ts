import { Component, Input } from '@angular/core';

import { Comment } from '../../interfaces';

@Component({
  selector: 'app-post-comment-card',
  templateUrl: './post-comment-card.component.html',
  styleUrls: ['./post-comment-card.component.scss']
})
export class PostCommentCardComponent {
  @Input() public comment: Comment;
}
