import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDtos, LogisticsResources } from '@hacienda-platform/api-interfaces';
import { LogisticsProviderContactEndpoint } from 'apps/client-admin/src/app/api/endpoints/logistics/logistics-provider-contact.endpoint';
import { LogisticsProviderEndpoint } from 'apps/client-admin/src/app/api/endpoints/logistics/logistics-provider.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector:
    'hacienda-platform-logistics-provider-detail-page',
  templateUrl:
    './logistics-provider-detail-page.component.html',
  styleUrls: [
    './logistics-provider-detail-page.component.scss'
  ]
})
export class LogisticsProviderDetailPageComponent
  implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  updateMode = false;
  operation = '';
  logisticsProviderUpdateForm: FormGroup;
  logisticsProviderContactForm: FormGroup;
  deliveryOrders: any;
  visible2!: boolean;

  // deliveryOrders = [
  //   {
  //     uid: 'djsbfjkdsbgjksdfn',
  //     totalItems: 10,
  //     delivery_date: new Date(),
  //     created_at: new Date(),
  //   },
  //   {
  //     uid: 'djsbfjkdsbgjksdfn',
  //     totalItems: 10,
  //     delivery_date: new Date(),
  //     created_at: new Date(),
  //   }
  // ]

  uid = '';
  id = 0;
  loading = false;
  logisticsProvider!: LogisticsResources.LogisticsProviderResource;
  logisticsProviderContact!: LogisticsResources.LogisticsProviderContactResource;
  breadcrumbItems: MenuItem[] = [];
  logisticsProvidersContacts: LogisticsResources.LogisticsProviderContactResource[] = [];


  constructor(
    private _fb: FormBuilder,
    private appNotification: AppNotificationService,
    private appLoading: AppLoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private logisticsProviderContactEndpoint: LogisticsProviderContactEndpoint,
    private logisticsProviderEndpoint: LogisticsProviderEndpoint,
    private confirmationService: ConfirmationService
  ) {
    //setting the commodityCategoryForm to FormBuilder
    //and setting the validation required.
    this.logisticsProviderUpdateForm = this._fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      office_address: new FormControl('', [Validators.required]),
    });
    this.logisticsProviderContactForm = this._fb.group({
      full_name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      contact_phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
      contact_email: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/main/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'Logistics Provider Contact',
      routerLink: ['/m/logistics/logistics/provider/list']
    });
    this.breadcrumbItems.push({
      label: 'Detail Page'
      // routerLink: ['/m/commodity/category/new']
    });

    //receiving the route data from resolver and subscribing to it.
    //handling the error to the user interface and seting notification
    this.route.data.subscribe({
      next: (response) => {
        this.logisticsProvider = response['data'];
        this.uid = this.logisticsProvider.uid;
        this.id = this.logisticsProvider.id ? this.logisticsProvider.id : 0;

        this.deliveryOrders = response['data'].deliveryOrderVoucher ?? [];

        if (this.logisticsProvider.contacts) {
          this.logisticsProvidersContacts = this.logisticsProvider.contacts;
        }
      },
      error: (error) => {
        this.appLoading.stopLoading();
        this.appNotification.showError({
          title: 'Failed',
          detail: error.error.message.message
        });
      }
    });
  }

  // back button to be route to the commodity category list page
  backbtn() {
    this.router.navigate(['/m/logistics/logistics/provider/list']);
  }

  //assigning fc as a form comtrol for validation purposes in the form interface
  get fc() {
    return this.logisticsProviderUpdateForm.controls;
  }

  // On edit data will be pass and will be use to load existing data to form input..
  onEdit(data: any) {
    this.updateMode = true;
    this.uid = data.uid;

    const formData = {
      name: data.name,
      office_address: data.office_address,
    };

    this.fc['name'].patchValue(formData.name);
    this.fc['office_address'].patchValue(formData.office_address);
  }

  viewRecord(data: LogisticsResources.LogisticsProviderContactResource) {
    this.operation = 'view';
    this.logisticsProviderContact = data;
  }

  viewDeliveryOrderRecord(uid: string) {
    this.router.navigate(['/m/logistics/logistics/provider/delivery-order', uid]);
  }

  //On delete a warnig dialog box will pop and request for permission to proceed
  // data.uid will be passed to the category service in other to
  //complete the deletion process
  onDelete() {
    // this.uid = data.uid;
    this.confirmationService.confirm({
      key: 'confirm1',
      message:
        'Are you sure you want to perform this action',
      accept: () => {
        this.appLoading.startLoading('Loading....');
        this.logisticsProviderEndpoint.delete(this.uid).subscribe({
          next: () => {
            this.appLoading.stopLoading();
            this.appNotification.showSuccess({
              title: 'Logistics Provider',
              detail:
                'record deleted successfully!'
            });
            this.router.navigate([
              '/m/logistics/logistics/provider/list'
            ]);
          },
          error: (error) => {
            this.appLoading.stopLoading();
            this.appNotification.showError({
              title: 'Oops!!!',
              detail: error.error.message.message
            });
          }
        });
      }
    });
  }

  //On update mode a cancel button to go back to the detail page.
  onCancel() {
    this.updateMode = false;
  }

  // On update a commodity category will be updated
  onUpdate() {
    this.appLoading.startLoading('Loading');

    const formData = this.logisticsProviderUpdateForm.value;

    const payload: AdminDtos.CreateLogisticsProviderDto = {
      name: formData.name,
      office_address: formData.office_address,
    };

    this.logisticsProviderEndpoint.update(this.uid, payload)
      .subscribe({
        next: () => {
          this.updateMode = false;
          this.logisticsProvider.name = payload.name;
          this.logisticsProvider.office_address = payload.office_address;
          this.appLoading.stopLoading();
          this.fmReset();
          this.appNotification.showSuccess({
            title: 'Logistics Provider Contact',
            detail: 'record updated successfully!'
          });
        },
        error: (error) => {
          this.updateMode = false;
          this.appLoading.stopLoading();
          console.log(error);

          this.appNotification.showError({
            title: 'Oops !!!',
            detail: error.error.message.message
          });
        }
      });
  }
  // reseting the form input to empty.
  fmReset() {
    return this.logisticsProviderUpdateForm.reset();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  get logisticsProviderContactFormControls() {
    return this.logisticsProviderContactForm.controls;
  }


  gotoPreview(operation: string) {
    this.operation = operation;
    const data = this.logisticsProviderContactForm.value;
    this.logisticsProviderContact = {
      ...this.logisticsProviderContact,
      full_name: data.full_name,
      contact_email: data.contact_email,
      contact_phone: data.contact_phone
    }
  }

  addNewContactForm() {
    this.stepBack()
    this.operation = 'Add';
  }

  onContactEdit() {
    this.operation = 'Update'
    this.logisticsProviderContactFormControls['full_name'].patchValue(this.logisticsProviderContact.full_name);
    this.logisticsProviderContactFormControls['contact_email'].patchValue(this.logisticsProviderContact.contact_email);
    this.logisticsProviderContactFormControls['contact_phone'].patchValue(this.logisticsProviderContact.contact_phone);

  }

  processForm() {
    console.log('Logistics', this.logisticsProviderContact);
    const payload: AdminDtos.CreateLogisticsProviderContactDto = {
      full_name: this.logisticsProviderContact.full_name,
      contact_phone: this.logisticsProviderContact.contact_phone,
      contact_email: this.logisticsProviderContact.contact_email,
      logistics_provider_id: this.id,
    };
    const httpCall = this.operation === 'update preview' ? this.logisticsProviderContactEndpoint.update(this.logisticsProviderContact.uid, payload) :
      this.logisticsProviderContactEndpoint.create(payload);
    this.appLoading.startLoading('loading . . .');
    httpCall.subscribe({
      next: (response) => {
        this.appLoading.stopLoading();
        this.appNotification.showSuccess({
          title: 'Operation',
          detail: 'was successfully'
        });
        if (this.operation === 'update preview') {
          const updatedData = this.logisticsProvidersContacts.map(item => {
            if (item.uid == response.uid) {
              return this.logisticsProviderContact;
            }
            return item;
          });

          this.logisticsProvidersContacts = updatedData;
        } else {
          this.logisticsProvidersContacts.push(<LogisticsResources.LogisticsProviderContactResource>response);
        }
        this.stepBack();

      },
      error: (error) => {
        this.appLoading.stopLoading();
        this.appNotification.showError({
          title: 'Oops!!!',
          detail: error.error.message.message
        });
      }
    });
  }

  stepBack() {
    this.operation = '';
    this.logisticsProviderUpdateForm.reset();
    this.logisticsProviderContactForm.reset();
  }

  onContactDelete() {
    this.confirmationService.confirm({
      key: 'confirm1',
      message:
        'Are you sure you want to delete this contact person?',
      accept: () => {
        this.appLoading.startLoading('Loading....');
        this.logisticsProviderContactEndpoint.delete(this.logisticsProviderContact.uid).subscribe({
          next: (response) => {
            const data = this.logisticsProvidersContacts.filter(item => item.uid != response.uid);
            this.appLoading.stopLoading();
            this.appNotification.showSuccess({
              title: 'Logistics Provider Contact',
              detail: 'record deleted successfully!'
            });

            this.logisticsProvidersContacts = data;
            // this.visible2 = false;
            // this.stepBack();
          },
          error: (error) => {
            this.appLoading.stopLoading();
            this.appNotification.showError({
              title: 'Failed',
              detail: error.error.message.message
            });
          }
        });
      }
    });
  }

  goBack() {
    // return this.router.navigate(['/m/user/user/list']);
    window.history.back();

  }

}

