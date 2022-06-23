import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { options } from '../configs/editor.options';
import { AlertService } from '../shared/services/alert.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  public froalaOptions: Object = options;
  private uid: string | null = localStorage.getItem('localId');

  constructor(
    public createPostForm: FormGroup,
    private postService: PostsService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      textContent: new FormControl(null, Validators.required)
    })
  }

  submit() {
    if (this.createPostForm.invalid) {
      return;
    }

    const post: Post = {
      title: this.createPostForm.value.title,
      author: this.createPostForm.value.author,
      textContent: this.createPostForm.value.textContent,
      date: new Date()
    }

    this.postService.create(post).subscribe((post) => {
      this.createPostForm.reset();
      this.router.navigate(['post', `${this.uid}`, `${post.title}`]);
      this.alert.success('Post was created.');
    })
  }
}
