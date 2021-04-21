import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'home-menu',
    loadChildren: () => import('./modules/home-menu/home-menu.module').then((m) => m.HomeMenuPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginPageModule),
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
    path: 'credits',
    loadChildren: () =>
      import('./modules/credits/credits.module').then((m) => m.CreditsPageModule),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./modules/create/create.module').then((m) => m.CreatePageModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
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
