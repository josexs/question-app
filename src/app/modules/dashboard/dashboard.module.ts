import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardPage } from './dashboard.page';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
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
