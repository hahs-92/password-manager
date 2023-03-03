import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { PasswordListComponent } from './pages/password-list/password-list.component';
import { SiteListComponent } from './pages/site-list/site-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'site-list',
    component: SiteListComponent,
  },
  {
    path: 'password-list',
    component: PasswordListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
