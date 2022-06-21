import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { PostCreateCommentComponent } from './shared/components/post-create-comment/post-create-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupPageComponent } from './admin/signup-page/signup-page/signup-page.component';
import { PostShowCommentsComponent } from './shared/components/post-show-comments/post-show-comments.component';
import { PostCommentCardComponent } from './shared/components/post-comment-card/post-comment-card.component';
import { PaginationComponent } from './home-page/pagination/pagination.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
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
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
