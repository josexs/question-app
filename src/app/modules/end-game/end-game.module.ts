import { NgModule } from '@angular/core';
import { EndGamePage } from './page/end-game.page';
import { SharedModule } from '@shared';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: EndGamePage,
      },
    ]),
  ],
  declarations: [EndGamePage],
})
export class EndGameModule {}
