import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserEndpoint } from 'apps/client-admin/src/app/api/endpoints/user/user.endpoint';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss']
})
export class UserListPageComponent implements OnInit {
  loading = false;
@ViewChild('filter') filter!: ElementRef;


  data:any;
  uid: string = '';
  updateMode = false;
  userForm:FormGroup;
  formRequestData:any;
  breadcrumbItems!: MenuItem[];
  

  constructor(private userEndPoint: UserEndpoint, 
    private router: Router) {

    this.userForm = new FormGroup({
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
  
  get UserFormControls(){
    return this.userForm.controls;
  }


  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    // this.breadcrumbItems.push({ label: 'List of Commodities', routerLink: ['/m/commodity/item/list'] });
    this.breadcrumbItems.push({ label: 'List of Users' });
    this.userEndPoint.list().subscribe({
      next: (response) =>{
        this.data = response;
      },
      error:(error) => console.log(error)
    });
    
  }

  gotoNewPage() {
    return this.router.navigate(['/m/user/users/new', ]);
  }

  viewUser(uid:string) {
    return this.router.navigate(['/m/user/users/detail', uid]);

  }
  goBack() {
    window.history.back();
  }
}
