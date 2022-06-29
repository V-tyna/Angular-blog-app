import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SignupPageComponent } from './admin/signup-page/signup-page/signup-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PaginationComponent } from './home-page/pagination/pagination.component';
import { PostPageComponent } from './post-page/post-page.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { PostCommentCardComponent } from './shared/components/post-comment-card/post-comment-card.component';
import { PostCreateCommentComponent } from './shared/components/post-create-comment/post-create-comment.component';
import { PostShowCommentsComponent } from './shared/components/post-show-comments/post-show-comments.component';
import { SharedModule } from './shared/shared.module';

const INTERCEPTOR_PROVIDER: Provider = {
  multi: true,
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor
};

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostCardComponent,
    PostCreateCommentComponent,
    PostShowCommentsComponent,
    PostCommentCardComponent,
    SignupPageComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDER]
})
export class AppModule { }
