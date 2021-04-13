import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from 'app/pipes/pipes.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardPage } from './dashboard/admin-dashboard.page';
import { AdminListAllPage } from './list-all/admin-list-all.page';
import { AdminListSentPage } from './list-sent/admin-list-sent.page';
import { AdminEditQuestionPage } from './edit-question/admin-edit-question.page';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdminRoutingModule, PipesModule],
  declarations: [AdminDashboardPage, AdminListAllPage, AdminListSentPage, AdminEditQuestionPage],
  providers: [],
})
export class AdminModule { }
