import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './admin/login-page/login-page.component';
import { SignupPageComponent } from './admin/signup-page/signup-page/signup-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { routesPaths } from './routes';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: routesPaths.home, component: MainLayoutComponent, children: [
      { path: routesPaths.home, redirectTo: '/', pathMatch: 'full' },
      { path: routesPaths.home, component: HomePageComponent },
      { path: routesPaths.login, component: LoginPageComponent },
      { path: routesPaths.signup, component: SignupPageComponent },
      { path: routesPaths.postPage, component: PostPageComponent }
    ]
  },
  {
    path: routesPaths.admin, loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
