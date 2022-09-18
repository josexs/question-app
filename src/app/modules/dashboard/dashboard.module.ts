import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'app/pipes/pipes.module';
import { DashboardPage } from './dashboard.page';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
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
