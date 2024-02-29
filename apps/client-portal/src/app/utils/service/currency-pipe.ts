import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1e9) {
      // Format as billions
      return (value / 1e9).toFixed(2) + "B";
    } else {
      // Format with thousands separator
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
