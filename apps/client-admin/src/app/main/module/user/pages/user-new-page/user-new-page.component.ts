import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserEndpoint } from 'apps/client-admin/src/app/api/endpoints/user/user.endpoint';
import { MustMatch } from 'apps/client-admin/src/app/api/validators/must-match.validator';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { MenuItem } from 'primeng/api';

@Component({
  templateUrl: './user-new-page.component.html',
  styleUrls: ['./user-new-page.component.scss']
})
export class UserNewPageComponent implements OnInit {
  formRequestData:any;
  canSubmit = false;
  breadcrumbItems!: MenuItem[];
  

  constructor(
    private appLoadingService: AppLoadingService,
    private appMessageService: AppNotificationService,
    private userEndpoint: UserEndpoint,
    private readonly appNotificationService: 
    AppNotificationService,
    private route: ActivatedRoute
    , private router:Router,
    private fb: FormBuilder
    
  ) {}
   userForm: FormGroup = this.fb.group({
      full_name: this.fb.control(""),
      email: this.fb.control("", Validators.email),
      password: this.fb.control("", Validators.minLength(8)),
      confirm_password: this.fb.control("", Validators.minLength(8))
    }, {validator: MustMatch('password', 'confirm_password')}) ;
  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List of Users', routerLink: ['/m/user/users/list'] });
    this.breadcrumbItems.push({ label: 'Add User' });
    this.userForm.statusChanges.subscribe({
      next: (status) =>{
        this.canSubmit = status === 'VALID'
      }
    });
    // throw new Error('Method not implemented.');
  }
  get userFormControls(){
    return this.userForm.controls;
  }

  addUser(){
    const frmData = {
      full_name: this.userFormControls['full_name'].value,
      email: this.userFormControls['email'].value,
      password: this.userFormControls['password'].value
    };

    this.formRequestData = frmData;

    
    this.appLoadingService.startLoading('Proccessing');

    this.userEndpoint.create(this.formRequestData).subscribe({
      next:()=>{
    this.appLoadingService.stopLoading();

        this.appNotificationService.showSuccess({
          title: "Success",
          detail: "user Record Added Successfully!"
        });
        this.userForm.reset();
        this.appLoadingService.stopLoading();
        this.router.navigate(['/m/user/users/list']);
      
      },
      error:(error)=>{
    this.appLoadingService.stopLoading();
    console.log(error)

        this.appNotificationService.showError({
          title: error.error.message.error,
          detail: error.error.message.message
        })
      }
      
    });

  }

  goBack() {
    window.history.back();
  }
}
