import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeMenuPage } from './home-menu.page';
import { HomeMenuPageRoutingModule } from './home-menu-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomeMenuPageRoutingModule],
  declarations: [HomeMenuPage],
})
export class HomeMenuPageModule {}
