import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InitOptionsPage } from './options.page';
import { PipesModule } from 'app/pipes/pipes.module';
import { OptionsParticipantsComponent } from './components/options-participants/options-participants.component';
import { RouterModule } from '@angular/router';
import { OptionsInitComponent } from './components/options-init/options-init.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: InitOptionsPage,
      },
    ]),
  ],
  declarations: [InitOptionsPage, OptionsInitComponent, OptionsParticipantsComponent],
})
export class InitOptionsModule {}
