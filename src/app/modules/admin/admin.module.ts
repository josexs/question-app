import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'app/pipes/pipes.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardPage } from './dashboard/admin-dashboard.page';
import { AdminListAllPage } from './list-all/admin-list-all.page';
import { AdminListSentPage } from './list-sent/admin-list-sent.page';
import { AdminEditQuestionPage } from './edit-question/admin-edit-question.page';
import { AdminCreateQuestionPage } from './create/admin-create-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRoutingModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AdminDashboardPage,
    AdminListAllPage,
    AdminListSentPage,
    AdminEditQuestionPage,
    AdminCreateQuestionPage,
  ],
  providers: [],
})
export class AdminModule {}
