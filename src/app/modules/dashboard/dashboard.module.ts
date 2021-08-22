import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'app/pipes/pipes.module';
import { DashboardPage } from './dashboard.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PipesModule, RouterModule.forChild(
    [
      {
        path: '',
        component: DashboardPage,
      },
    ]
  )],
  declarations: [DashboardPage],
})
export class DashboardModule {}
