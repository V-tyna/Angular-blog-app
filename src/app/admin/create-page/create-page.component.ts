import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PostsService } from '../../services/posts.service';
import { Post } from '../../shared/interfaces';
import { options } from '../configs/editor.options';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  public createPostForm: FormGroup;
  public froalaOptions: object = options;
  private uuid: string | null = localStorage.getItem('localId');

  constructor(
    private postService: PostsService,
    private alert: AlertService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.createPostForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      textContent: new FormControl(null, Validators.required)
    });
  }

  public submit() {
    if (this.createPostForm.invalid) {
      return;
    }

    const { title, author, textContent } = this.createPostForm.value;

    const newPost: Post = {
      title,
      author,
      textContent,
      date: new Date()
    };

    this.postService.create(newPost).subscribe((post: Post) => {
      this.createPostForm.reset();
      this.router.navigate(['post', `${this.uuid}`, `${post.title}`]);
      this.alert.success('Post was created.');
    });
  }
}
