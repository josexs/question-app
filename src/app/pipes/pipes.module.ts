import { NgModule } from '@angular/core';
import { GenderPipe } from './gender.pipe';
import { ImagePipe } from './image.pipe';
import { TypePipe } from './type.pipe';

@NgModule({
  imports: [],
  exports: [GenderPipe, TypePipe, ImagePipe],
  declarations: [GenderPipe, TypePipe, ImagePipe],
  providers: [],
})
export class PipesModule { }
