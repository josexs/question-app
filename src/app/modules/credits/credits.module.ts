import { NgModule } from '@angular/core';
import { CreditsPage } from './credits.page';
import { CreditsPageRoutingModule } from './credits-routing.module';
import { SharedModule } from '@shared';

@NgModule({
  imports: [SharedModule, CreditsPageRoutingModule],
  declarations: [CreditsPage],
})
export class CreditsPageModule {}
