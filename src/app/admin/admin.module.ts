import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { adminRoutesPaths } from './admin.routes';
import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditCommentComponent } from './my-comments-page/edit-comment/edit-comment.component';
import { MyCommentsPageComponent } from './my-comments-page/my-comments-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: adminRoutesPaths.home, component: AdminLayoutComponent, children: [
      { path: adminRoutesPaths.home, redirectTo: adminRoutesPaths.redirectToLogin, pathMatch: 'full' },
      { path: adminRoutesPaths.login, redirectTo: adminRoutesPaths.redirectToLogin, pathMatch: 'full' },
      { path: adminRoutesPaths.dashboard, component: DashboardPageComponent, canActivate: [AuthGuard] },
      { path: adminRoutesPaths.create, component: CreatePageComponent, canActivate: [AuthGuard] },
      { path: adminRoutesPaths.comments, component: MyCommentsPageComponent, canActivate: [AuthGuard] },
      { path: adminRoutesPaths.editPost, component: EditPageComponent, canActivate: [AuthGuard] },
      { path: adminRoutesPaths.editComment, component: EditCommentComponent, canActivate: [AuthGuard] }
    ]
  }
];
@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    MyCommentsPageComponent,
    EditCommentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AdminModule {
}
