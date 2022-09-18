import { NgModule } from '@angular/core';
import { InitOptionsPage } from './options.page';
import { OptionsParticipantsComponent } from './components/options-participants/options-participants.component';
import { RouterModule } from '@angular/router';
import { OptionsInitComponent } from './components/options-init/options-init.component';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: InitOptionsPage,
      },
    ]),
  ],
  declarations: [
    InitOptionsPage,
    OptionsInitComponent,
    OptionsParticipantsComponent,
  ],
})
export class InitOptionsModule {}
