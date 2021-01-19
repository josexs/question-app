import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsProvider {
  constructor() {}

  randomNumber(max: number, min = 1, decimal = false): string {
    if (!decimal) {
      if (min > 1) {
        return (Math.random() * (max - min) + min).toFixed(0);
      }
      return (Math.random() * (max - min)).toFixed(0);
    } else if (decimal) {
      const maxArray = max.toString().split('.');
      const maxOk = [Number(maxArray[0]), Number(maxArray[1])];
      const minArray = min.toString().split('.');
      const minOk = [Number(minArray[0]), Number(minArray[1])];
      const dataOk = Math.random() * (max - min) + min;
      const dataSubOk: any = this.randomNumber(maxOk[1], minOk[1]);
      return dataOk.toFixed(0) + '.' + dataSubOk;
    }
  }

  shuffle(array: any[]): any[] {
    let currentIndex = array.length;
    let temporaryValue: any;
    let randomIndex: any;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
