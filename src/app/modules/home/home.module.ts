import { NgModule } from '@angular/core';
import { HomePage } from './page/home.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
  ],
  declarations: [HomePage],
})
export class HomeModule {}
