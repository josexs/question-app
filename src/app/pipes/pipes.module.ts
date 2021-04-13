import { NgModule } from '@angular/core';
import { GenderPipe } from './gender.pipe';
import { ImagePipe } from './image.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { TypePipe } from './type.pipe';

@NgModule({
  imports: [],
  exports: [GenderPipe, TypePipe, ImagePipe, TimeAgoPipe],
  declarations: [GenderPipe, TypePipe, ImagePipe, TimeAgoPipe],
  providers: [],
})
export class PipesModule { }
