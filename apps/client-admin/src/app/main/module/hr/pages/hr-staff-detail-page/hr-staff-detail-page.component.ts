import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HrStaffEndpoint } from 'apps/client-admin/src/app/api/endpoints/hr-staff.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { ConfirmationService, ConfirmEventType, MenuItem, Message, MessageService } from 'primeng/api';

@Component({
  templateUrl: './hr-staff-detail-page.component.html',
  styleUrls: ['./hr-staff-detail-page.component.scss'],
})
export class HrStaffDetailPageComponent implements OnInit {

  data: any;
  uid = '';
  updateMode = false;
  hrStaffForm!: FormGroup
  formRequestData: any;
  breadcrumbItems!: MenuItem[];

  msgs: Message[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private hrStaffEndPoint: HrStaffEndpoint,
    private appLoadingService: AppLoadingService,
    private appMessageService: AppNotificationService,
    private route: ActivatedRoute,
    private messageService: MessageService
    , private router: Router,
  ) {
    this.hrStaffForm = new FormGroup({
      uid: new FormControl(),
      full_name: new FormControl(),
      contact_email: new FormControl(""),
      contact_address: new FormControl(""),
      contact_phone: new FormControl(""),
    });

  }

  get hrStaffFormControls() {
    return this.hrStaffForm.controls;
  }

  ngOnInit(): void {

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard', routerLink: ['/dashboard'] });
    this.breadcrumbItems.push({ label: 'List of Staff', routerLink: ['/m/hr/staff/list'] });
    this.breadcrumbItems.push({ label: 'Staff Details' });
    this.appLoadingService.startLoading('Proccessing');
    this.route.params.subscribe((params) => {

      if (params['uid']) {
        this.uid = params['uid'];

        this.hrStaffEndPoint.findByUid(this.uid).subscribe({
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

  editStaff() {
    this.hrStaffFormControls['full_name'].patchValue(this.data.full_name);
    this.hrStaffFormControls['contact_email'].patchValue(this.data.contact_email);
    this.hrStaffFormControls['contact_address'].patchValue(this.data.contact_address);
    this.hrStaffFormControls['contact_phone'].patchValue(this.data.contact_phone);
    this.hrStaffFormControls['uid'].patchValue(this.data.uid);

    this.updateMode = true;

  }

  updateStaff() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    const frmData = {
      full_name: this.hrStaffFormControls['full_name'].value,
      uid: this.hrStaffFormControls['uid'].value,
      contact_email: this.hrStaffFormControls['contact_email'].value,
      contact_address: this.hrStaffFormControls['contact_address'].value,
      contact_phone: this.hrStaffFormControls['contact_phone'].value

    };

    this.formRequestData = frmData;
    this.appLoadingService.startLoading('Proccessing');

    this.hrStaffEndPoint.update(this.uid, this.formRequestData).subscribe({
      next: (response) => {
        this.data = this.formRequestData;

        this.updateMode = false;
        this.appLoadingService.stopLoading();
      },
      error: (err) => {
        this.appLoadingService.stopLoading();
      }

    });

  }

  deleteStaff() {
    this.appLoadingService.startLoading('Proccessing');

    this.hrStaffEndPoint.delete(this.uid).subscribe({
      next: (response) => {
        this.appLoadingService.stopLoading()
        return this.router.navigate(['/m/hr/staff/list']);

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
    return this.router.navigate(['/m/hr/staff/list']);
  }

  deleteItem() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.hrStaffEndPoint.delete(this.uid).subscribe({
          next: (data) => {
            this.appLoadingService.stopLoading()
            return this.router.navigate(['/m/hr/staff/list']);
            this.messageService.clear('c');
            this.appMessageService.showSuccess({ title: 'Operation successful', detail: 'User Group has been sucessfully deleted' });
            this.msgs = [{ severity: 'success', summary: 'Confirmed', detail: 'User Group has been sucessfully deleted' }];
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

  // confirm2() {
  //   this.confirmationService.confirm({
  //     message: 'Do you want to delete this record?',
  //     header: 'Delete Confirmation',
  //     icon: 'pi pi-info-circle',
  //     accept: () => {
  //       this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
  //     },
  //     reject: (type) => {
  //       switch (type) {
  //         case ConfirmEventType.REJECT:
  //           this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
  //           break;
  //         case ConfirmEventType.CANCEL:
  //           this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
  //           break;
  //       }
  //     }
  //   });
  // }
}
