import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';

import { PostsService } from '../../services/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html'
})
export class EditPageComponent implements OnInit, OnDestroy {
  public formEditPost: FormGroup;
  public submitted: boolean = false;
  private editingPost!: Post;
  private updateSubscription: Subscription;
  private postId: string;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getUserPostById(params['id']);
      })
    ).subscribe((post: Post) => {
      this.editingPost = post;
      this.formEditPost = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        textContent: new FormControl(post.textContent, Validators.required)
      });
    });
  }

  public submitEditPost(): void {
    if (this.formEditPost.invalid) {
      return;
    }

    this.submitted = true;

    this.route.params.subscribe((params: Params) => this.postId = params['id']);

    this.updateSubscription = this.postsService.updatePost(this.postId, {
      ...this.editingPost,
      textContent: this.formEditPost?.value.textContent,
      title: this.formEditPost?.value.title
    }).subscribe(() => {
      this.alert.success('Post was updated.');
    });

    this.submitted = false;
    this.router.navigate(['/admin', 'dashboard']);
  }

  public ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe();
  }

}
