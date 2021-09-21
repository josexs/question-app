import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { EndGamePage } from './end-game.page';

import { EndGamePageRoutingModule } from './end-game-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EndGamePageRoutingModule],
  declarations: [EndGamePage],
})
export class EndGameModule {}
