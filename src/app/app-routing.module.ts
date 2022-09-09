import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'send',
    loadChildren: () => import('./modules/send/send.module').then((m) => m.SendModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'options',
    loadChildren: () =>
      import('./modules/options/options.module').then((m) => m.InitOptionsModule),
  },
  {
    path: 'options-resume',
    loadChildren: () =>
      import('./modules/options-resume/options-resume.module').then((m) => m.OptionsResumeModule),
  },
  {
    path: 'question',
    loadChildren: () =>
      import('./modules/question/question.module').then((m) => m.QuestionModule),
  },
  {
    path: 'question-resume',
    loadChildren: () =>
      import('./modules/question-resume/question-resume.module').then(
        (m) => m.QuestionResumeModule
      ),
  },
  {
    path: 'classification',
    loadChildren: () =>
      import('./modules/classification/classification.module').then(
        (m) => m.ClassificationModule
      ),
  },
  {
    path: 'credits',
    loadChildren: () => import('./modules/credits/credits.module').then((m) => m.CreditsPageModule),
  },
  {
    path: 'create',
    loadChildren: () => import('./modules/send/send.module').then((m) => m.SendModule),
  },
  {
    path: 'end-game',
    loadChildren: () =>
      import('./modules/end-game/end-game.module').then((m) => m.EndGameModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
