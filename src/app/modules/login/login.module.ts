import { NgModule } from '@angular/core';
import { LoginPage } from './page/login.page';
import { SharedModule } from '@shared';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage,
      },
    ]),
  ],
  declarations: [LoginPage],
})
export class LoginModule {}
