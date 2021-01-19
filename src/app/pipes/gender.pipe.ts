import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe',
})
export class GenderPipe implements PipeTransform {
  transform(value: any): any {
    if (value === 'male') {
      return 'Hombre';
    } else if (value === 'female') {
      return 'Mujer';
    }
  }
}
