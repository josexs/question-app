import { NgModule } from '@angular/core';
import { DashboardPage } from './page/dashboard.page';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardPage,
      },
    ]),
  ],
  declarations: [DashboardPage, DashboardHeaderComponent],
})
export class DashboardModule {}
