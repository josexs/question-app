import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClassificationPage } from './classification.page';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClassificationPage,
      },
    ]),
  ],
  declarations: [ClassificationPage],
})
export class ClassificationModule {}
