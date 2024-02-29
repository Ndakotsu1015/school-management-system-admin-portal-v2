import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserEndpoint } from 'apps/client-admin/src/app/api/endpoints/user/user.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { UpdateAdminUserActivationStatusDto } from 'libs/api-interfaces/src/lib/dtos/admin';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';

@Component({
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.scss']
})
export class UserDetailPageComponent implements OnInit {
  
  data: any;
  uid: string = '';
  updateMode = false;
  userForm!: FormGroup;
  formRequestData: any;
  is_active = false;
  breadcrumbItems!: MenuItem[];

  msgs: Message[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private userEndpoint: UserEndpoint,
    private appLoadingService: AppLoadingService,
    private appMessageService: AppNotificationService,
    private route: ActivatedRoute,
    private messageService: MessageService
    , private router: Router,
  ) {
    this.userForm = new FormGroup({
      full_name: new FormControl(),
      email: new FormControl("", Validators.email)
    });

  }

  get userFormControls() {
    return this.userForm.controls;
  }

  ngOnInit(): void {

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'List of Users',
      routerLink: ['/m/user/users/list']
    });
    this.breadcrumbItems.push({ label: 'Detail' });

    this.appLoadingService.startLoading('Proccessing');
    this.route.params.subscribe((params) => {

      if (params['uid']) {
        this.uid = params['uid'];

        this.userEndpoint.findByUid(this.uid).subscribe({
          next: (response) => {
            this.data = response;
            this.appLoadingService.stopLoading();

          },
          error: (error) => {
            this.appLoadingService.stopLoading();
          }
        });
      }
      this.appLoadingService.stopLoading()
    });
  }

  editUser() {
    this.userFormControls['full_name'].patchValue(this.data.full_name);
    this.userFormControls['email'].patchValue(this.data.email)

    this.updateMode = true;
    console.log('it tickles')

  }

  updateUser() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    const frmData = {
      full_name: this.userFormControls['full_name'].value,
      email: this.userFormControls['email'].value

    };

    this.formRequestData = frmData;
    this.appLoadingService.startLoading('Proccessing');

    this.userEndpoint.updateInfo(this.uid, this.formRequestData).subscribe({
      next: () => {
        this.data = this.formRequestData;

        this.updateMode = false;
        this.appLoadingService.stopLoading();
      },
      error: () => {
        this.appLoadingService.stopLoading();
      }

    });

  }

  deleteUser() {
    this.appLoadingService.startLoading('Proccessing');

    this.userEndpoint.delete(this.uid).subscribe({
      next: () => {
        this.appLoadingService.stopLoading()
        this.router.navigate(['/m/user/user/list']);
        
        this.appMessageService.showSuccess({
          title: 'Success',
          detail: 'Record Deleted Successfully!!!'
        });
      },
      error: (error) => {
        this.appLoadingService.stopLoading();

        this.appMessageService.showError({
          title: 'Error!!!',
          detail: error.error.message
        });
      }
    });

  }

  goBack() {
    // return this.router.navigate(['/m/user/user/list']);
    window.history.back();

  }

  activate(uid: string) {
    const payload: UpdateAdminUserActivationStatusDto = {
      status : true
    }
    this.confirmationService.confirm({
      message: 'Are you sure you want to Activate this user',
      header: 'Activation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userEndpoint.updateActivationStatus(uid, payload).subscribe({
          next: (data) => {
            this.messageService.clear('c');
            this.appMessageService.showSuccess({ title: 'Operation successful', detail: 'User has been sucessfully activated' });
            this.msgs = [{ severity: 'success', summary: 'Confirmed', detail: 'User has been sucessfully activated' }];
            this.is_active = true;
            // filter the user out
            this.data.is_active = true;
          },
          error: (err) => {
            this.appMessageService.showError({ title: err });
          }
        })

      },
      reject: () => {
        this.appMessageService.showWarning({ title: 'Operation has been canceled' });
      }
    });
  }

  deactivate(uid: string) {
    const payload: UpdateAdminUserActivationStatusDto = {
      status : false
    }
    this.confirmationService.confirm({
      message: 'Are you sure you want to Deactivate this user',
      header: 'Deactivate',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userEndpoint.updateActivationStatus(uid, payload).subscribe({
          next: (data) => {
            this.messageService.clear('c');
            this.appMessageService.showSuccess({ title: 'Operation successful', detail: 'User has been sucessfully deactivated' });
            this.msgs = [{ severity: 'success', summary: 'Confirmed', detail: 'User has been sucessfully deactivated' }];
            this.data.is_active = false;
          },
          error: (err) => {
            this.appMessageService.showError({ title: err });
          }
        })

      },
      reject: () => {
        this.appMessageService.showWarning({ title: 'Operation has been canceled' });
      }
    });
  }
}
