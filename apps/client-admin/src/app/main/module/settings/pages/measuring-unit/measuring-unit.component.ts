import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MeasuringUnitEndpoint } from 'apps/client-admin/src/app/api/endpoints/common/measuring-unit.endpoint';
import { MeasuringUnitResource } from 'libs/api-interfaces/src/lib/resources/commodity';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'hacienda-platform-measuring-unit',
  templateUrl: './measuring-unit.component.html',
  styleUrls: ['./measuring-unit.component.css']
})
export class MeasuringUnitComponent implements OnInit {

  loading = false;
  @ViewChild('filter') filter!: ElementRef;
  breadcrumbItems!: MenuItem[];

  measuringUnits?: MeasuringUnitResource[] = [];

  data: any;
  uid: string = '';
  updateMode = false

  measuringUnitDataRequest: any;

  constructor(private measuringUnitEndpoint: MeasuringUnitEndpoint,
    private router: Router) {

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }


  ngOnInit(): void {

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'Measuring Units List' });
    this.measuringUnitEndpoint.list().subscribe({
      next: (response) => {
        this.data = response;
      },

      error: (error) => console.log(error)
    });
  }

  // goToOrderList() {
  //   return this.router.navigate(['/m/order/customer-order/list'])
  // }

  viewMeasuringDetail(uid: string) {
    return this.router.navigate((['/m/order/customer-order/detail', uid]))
  }

  goBack() {
    // return this.router.navigate(['/m/user/user/list']);
    window.history.back();

  }
}


