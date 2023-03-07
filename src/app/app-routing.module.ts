import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { LoginComponent } from './pages/login/login.component';
import { PasswordListComponent } from './pages/password-list/password-list.component';
import { SiteListComponent } from './pages/site-list/site-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo(['site-list'])),
  },
  {
    path: 'site-list',
    component: SiteListComponent,
    ...canActivate(() => redirectUnauthorizedTo([''])),
  },
  {
    path: 'password-list',
    component: PasswordListComponent,
    ...canActivate(() => redirectUnauthorizedTo([''])),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
