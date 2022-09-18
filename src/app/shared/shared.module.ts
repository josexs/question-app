import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenderPipe, ImagePipe, TimeAgoPipe, TypePipe } from '@pipes';

const MODULES = [CommonModule, IonicModule, FormsModule];
const COMPONENTS = [];
const PIPES = [GenderPipe, ImagePipe, TimeAgoPipe, TypePipe];
const SERVICES = [];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [...SERVICES],
})
export class SharedModule {}
