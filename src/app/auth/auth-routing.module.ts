import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinginComponent } from './components/singin/singin.component';
import { SingupComponent } from './components/singup/singup.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      { path: '', component: SinginComponent, pathMatch: 'full' },
      { path: 'singup', component: SingupComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
