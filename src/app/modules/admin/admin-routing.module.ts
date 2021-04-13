import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardPage } from './dashboard/admin-dashboard.page';
import { AdminListAllPage } from './list-all/admin-list-all.page';
import { AdminListSentPage } from './list-sent/admin-list-sent.page';
import { AdminEditQuestionPage } from './edit-question/admin-edit-question.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPage,
  },
  {
    path: 'sent',
    component: AdminListSentPage,
  },
  {
    path: 'question',
    component: AdminEditQuestionPage,
  },
  {
    path: 'all',
    component: AdminListAllPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
