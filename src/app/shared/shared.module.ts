import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenderPipe, ImagePipe, TimeAgoPipe, TypePipe } from '@pipes';
import {
  AlertProvider,
  GameProvider,
  QuestionsProvider,
  UtilsProvider,
} from '@providers';

const MODULES = [CommonModule, IonicModule, FormsModule, ReactiveFormsModule];
const COMPONENTS = [];
const PIPES = [GenderPipe, ImagePipe, TimeAgoPipe, TypePipe];
const PROVIDERS = [
  GameProvider,
  QuestionsProvider,
  UtilsProvider,
  AlertProvider,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [...PROVIDERS],
})
export class SharedModule {}
