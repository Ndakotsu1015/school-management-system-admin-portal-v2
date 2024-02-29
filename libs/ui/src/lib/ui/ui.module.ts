import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRIMENG_IMPORTS } from './prime-ng';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [CommonModule, ...PRIMENG_IMPORTS],
  exports: [...PRIMENG_IMPORTS],
  providers: [MessageService],
})
export class UiModule { }
