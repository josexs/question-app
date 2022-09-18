import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared';
import { QuestionResumePage } from './page/question-resume.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuestionResumePage,
      },
    ]),
  ],
  declarations: [QuestionResumePage],
})
export class QuestionResumeModule {}
