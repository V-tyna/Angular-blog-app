import { Component, Input } from '@angular/core';

import { Post } from '../../interfaces';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html'
})
export class PostCardComponent {
  @Input() public post: Post;
}
