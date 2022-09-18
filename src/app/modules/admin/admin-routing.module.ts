import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardPage } from './dashboard/admin-dashboard.page';
import { AdminListAllPage } from './list-all/admin-list-all.page';
import { AdminListSentPage } from './list-sent/admin-list-sent.page';
import { AdminEditQuestionPage } from './edit-question/admin-edit-question.page';
import { AdminGuard } from '@core/guards/admin.guard';
import { AdminCreateQuestionPage } from './create/admin-create-question.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPage,
    canActivate: [AdminGuard],
  },
  {
    path: 'sent',
    component: AdminListSentPage,
    canActivate: [AdminGuard],
  },
  {
    path: 'question',
    component: AdminEditQuestionPage,
    canActivate: [AdminGuard],
  },
  {
    path: 'all',
    component: AdminListAllPage,
    canActivate: [AdminGuard],
  },
  {
    path: 'create',
    component: AdminCreateQuestionPage,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
