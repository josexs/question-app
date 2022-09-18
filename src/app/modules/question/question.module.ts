import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'app/pipes/pipes.module';
import { QuestionPage } from './question.page';
import { CountdownModule } from 'ngx-countdown';
import { RouterModule } from '@angular/router';
import { QuestionHeaderComponent } from './components/header/question-header.component';
import { QuestionCountdownComponent } from './components/countdown/question-countdown.component';
import { QuestionInfoComponent } from './components/info/question-info.component';
import { QuestionButtonsComponent } from './components/buttons/question-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule,
    CountdownModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuestionPage,
      },
    ]),
  ],
  declarations: [
    QuestionPage,
    QuestionHeaderComponent,
    QuestionCountdownComponent,
    QuestionInfoComponent,
    QuestionButtonsComponent,
  ],
})
export class QuestionModule {}
