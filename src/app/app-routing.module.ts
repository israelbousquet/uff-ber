import { LoginModule } from './domain/login/login.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './domain/login/pages/login/login.component';
import { authGuard } from './shared/guards/auth-guard';
import { ContentComponent } from './layouts/content/content/content.component';
import { content } from './shared/routes/content.route';
import { adminGuard } from './shared/guards/admin-guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./domain/login/login.module').then((m) => m.LoginModule),
    canActivate: [authGuard],
  },
  {
    path: "",
    component: ContentComponent,
    children: content,
    canActivate: [adminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
