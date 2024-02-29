import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { AppLayoutModule } from '../layout/app-layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@hacienda-platform/ui';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    AppLayoutModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ]
})
export class ModuleModule { }
