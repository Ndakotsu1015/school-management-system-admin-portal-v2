import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HrStaffEndpoint } from 'apps/client-admin/src/app/api/endpoints/hr-staff.endpoint';
import { isNotEmpty } from 'class-validator';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './hr-staff-list-page.component.html',
  styleUrls: ['./hr-staff-list-page.component.scss'],
})
 
export class HrStaffListPageComponent implements OnInit {

loading = false;
@ViewChild('filter') filter!: ElementRef;


  data:any;
  uid:string = '';
  updateMode = false;
  hrStaffForm:FormGroup;
  formRequestData:any;
  breadcrumbItems!: MenuItem[];
  

  constructor(
    private primengConfig: PrimeNGConfig,
    private hrStaffEndPoint: HrStaffEndpoint, 
    private router: Router) {

    this.hrStaffForm = new FormGroup({
      uid: new FormControl(),
      full_name: new FormControl(""),
      contact_email: new FormControl(""),
      contact_address: new FormControl(""),
      contact_phone: new FormControl(""),
    });
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  
  get hrStaffFormControls(){
    return this.hrStaffForm.controls;
  }


  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    // this.breadcrumbItems.push({ label: 'List of Commodities', routerLink: ['/m/commodity/item/list'] });
    this.breadcrumbItems.push({ label: 'Staff List' });
    this.primengConfig.ripple = true;
    this.hrStaffEndPoint.list().subscribe({
      next: (response) =>{
        this.data = response;
      },
      error:(error) => console.log(error)
    });
    
  }

  gotoNewPage() {
    return this.router.navigate(['/m/hr/staff/new', ]);
  }

  viewStaff(uid:string) {
    return this.router.navigate(['/m/hr/staff/detail', uid]);

  }


  goBack() {
    window.history.back();
  }
  
  

}
