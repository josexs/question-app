import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { PipesModule } from 'app/pipes/pipes.module';
import { QuestionPage } from './question.page';
import { QuestionPageRoutingModule } from './question-routing.module';
import { CountdownModule } from 'ngx-countdown';
import { QuestionResumeComponent } from './components/resume/question-resume.component';
import { QuestionClassificationComponent } from './components/classification/question-classification.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    QuestionPageRoutingModule,
    PipesModule,
    CountdownModule,
  ],
  declarations: [
    QuestionPage,
    QuestionResumeComponent,
    QuestionClassificationComponent,
  ],
})
export class QuestionPageModule {}
