import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePipe',
})
export class ImagePipe implements PipeTransform {
  transform(value: any): any {
    if (value === '') {
      return 'assets/images/no-image.jpg';
    } else {
      return value;
    }
    
  }
}
