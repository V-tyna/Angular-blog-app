import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditCommentComponent } from './my-comments-page/edit-comment/edit-comment.component';
import { MyCommentsPageComponent } from './my-comments-page/my-comments-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { AuthGuard } from './shared/services/auth.guard';

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
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    { path: '', redirectTo: '/login', pathMatch: 'full' },
                    { path: 'login', redirectTo: '/login', pathMatch: 'full' },
                    { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
                    { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
                    { path: 'comments', component: MyCommentsPageComponent, canActivate: [AuthGuard] },
                    { path: 'post/:id/:title/edit', component: EditPageComponent, canActivate: [AuthGuard] },
                    { path: 'my_comment/:title/:id/edit', component: EditCommentComponent, canActivate: [AuthGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})

export class AdminModule {
}
