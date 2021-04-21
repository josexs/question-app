import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePage } from './create.page';

import { CreatePageRoutingModule } from './create-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CreatePageRoutingModule, ReactiveFormsModule],
  declarations: [CreatePage],
})
export class CreatePageModule {}
