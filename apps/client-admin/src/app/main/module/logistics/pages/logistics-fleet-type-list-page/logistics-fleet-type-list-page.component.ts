import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogisticsFleetTypeEndpoint } from 'apps/client-admin/src/app/api/endpoints/logistics/logistics-fleet-type.endpoint';
import { LogisticsFleetTypeResource } from 'libs/api-interfaces/src/lib/resources/logistics';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl:
    './logistics-fleet-type-list-page.component.html',
  styleUrls: [
    './logistics-fleet-type-list-page.component.scss'
  ]
})

export class LogisticsFleetTypeListPageComponent implements OnInit {

  loading = false;
  @ViewChild('filter') filter!: ElementRef;

  logisticsFleetTypes: LogisticsFleetTypeResource[] = [];

  data: any;
  uid?: string = '';
  updateMode = false
  logisticsFleets: FormGroup;
  LogisticsRequestFrm: any;
  breadcrumbItems!: MenuItem[];

  constructor(private logisticsFleetTypeEndpoint: LogisticsFleetTypeEndpoint,
    private router: Router) {

    this.logisticsFleets = new FormGroup({
      uid: new FormControl(),
      name: new FormControl(""),
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  LogisticsFleetControls() {
    return this.logisticsFleets.controls
  }

  ngOnInit(): void {

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'Logistics Fleet Type List',
    });
    // this.breadcrumbItems.push({ label: 'Detail' });

    this.logisticsFleetTypeEndpoint.list().subscribe({
      next: (response) => {
        this.data = response;
      },

      error: (error) => console.log(error)
    });
  }

  goToNewLogisticsFleetType() {
    return this.router.navigate(['/m/logistics/logistics/fleet-type/new'])
  }


  viewLogisticsFleetTypeDetail(uid: string) {
    return this.router.navigate((['/m/logistics/logistics/fleet-type/detail', uid]))
  }

  goBack() {
    // return this.router.navigate(['/m/user/user/list']);
    window.history.back();

  }
}
