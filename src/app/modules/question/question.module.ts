import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'app/pipes/pipes.module';
import { QuestionPage } from './question.page';
import { CountdownModule } from 'ngx-countdown';
import { QuestionMenuComponent } from './components/menu-popover/question-menu.component';
import { RouterModule } from '@angular/router';

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
    ])
  ],
  declarations: [
    QuestionPage,
    QuestionMenuComponent,
  ],
})
export class QuestionModule {}
