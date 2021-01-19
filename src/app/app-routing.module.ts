import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'init-options',
    loadChildren: () =>
      import('./modules/init-options/init-options.module').then((m) => m.InitOptionsPageModule),
  },
  {
    path: 'question',
    loadChildren: () =>
      import('./modules/question/question.module').then((m) => m.QuestionPageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
