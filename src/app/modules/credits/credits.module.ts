import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CreditsPage } from './credits.page';

import { CreditsPageRoutingModule } from './credits-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CreditsPageRoutingModule],
  declarations: [CreditsPage],
})
export class CreditsPageModule {}
