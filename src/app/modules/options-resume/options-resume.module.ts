import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OptionsResumePage } from './page/options-resume.page';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OptionsResumePage,
      },
    ]),
  ],
  declarations: [OptionsResumePage],
})
export class OptionsResumeModule {}
