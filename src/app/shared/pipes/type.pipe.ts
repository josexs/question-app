import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typePipe',
})
export class TypePipe implements PipeTransform {
  transform(value: any): any {
    if (value === 'light') {
      return 'Suave';
    } else if (value === 'normal') {
      return 'Normal';
    } else if (value === 'hard') {
      return 'Fuerte';
    }
  }
}
