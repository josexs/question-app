import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitOptionsPage } from './init-options.page';

const routes: Routes = [
  {
    path: '',
    component: InitOptionsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitOptionsPageRoutingModule {}
