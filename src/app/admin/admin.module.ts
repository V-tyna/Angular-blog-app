import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page/login-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './shared/services/auth.guard';
import { SearchPipe } from './shared/pipes/search.pipe';
import { MyCommentsPageComponent } from './my-comments-page/my-comments-page.component';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent,
        SearchPipe,
        MyCommentsPageComponent
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
                ]
            }
        ])
    ],
    exports: [RouterModule]
})

export class AdminModule {

}