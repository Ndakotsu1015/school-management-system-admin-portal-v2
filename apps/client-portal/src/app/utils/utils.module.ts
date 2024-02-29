import { NgModule } from '@angular/core';
import { CurrencyFormatPipe } from './service/currency-pipe';

@NgModule({
  imports: [],
  declarations: [CurrencyFormatPipe],
  exports: [CurrencyFormatPipe],
})
export class UtilsModule { }
