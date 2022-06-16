import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  formEditPost!: FormGroup;
  editingPost!: Post;
  submitted: boolean = false;
  updateSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getPostById(params['id'], params['title']);
      })
    ).subscribe({
      next: (post: Post) => {
        this.editingPost = post;
        this.formEditPost = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          textContent: new FormControl(post.textContent, Validators.required)
        })
      }
    })
  }

  submitEditPost() {
    if(this.formEditPost?.invalid) {
      return;
    }

    this.submitted = true;

    this.updateSubscription = this.postsService.updatePost({
      ...this.editingPost,
      textContent: this.formEditPost?.value.textContent,
      title: this.formEditPost?.value.title,
    }).subscribe({
      next: () => {
        this.submitted = false;
        this.alert.warning('Post was updated.');
      }
    })
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe();
  }

}
