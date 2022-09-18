import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared';
import { SendPage } from './page/send.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SendPage,
      },
    ]),
    ReactiveFormsModule,
  ],
  declarations: [SendPage],
})
export class SendModule {}
