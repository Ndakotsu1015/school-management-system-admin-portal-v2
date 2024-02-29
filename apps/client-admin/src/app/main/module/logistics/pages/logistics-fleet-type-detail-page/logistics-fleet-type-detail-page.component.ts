import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogisticsFleetTypeEndpoint } from 'apps/client-admin/src/app/api/endpoints/logistics/logistics-fleet-type.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { UpdateLogisticsFleetTypeDto } from 'libs/api-interfaces/src/lib/dtos/admin';
import { LogisticsFleetTypeResource } from 'libs/api-interfaces/src/lib/resources/logistics';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';

@Component({
  templateUrl:
    './logistics-fleet-type-detail-page.component.html',
  styleUrls: [
    './logistics-fleet-type-detail-page.component.scss'
  ]
})
export class LogisticsFleetTypeDetailPageComponent
  implements OnInit {
  data?: LogisticsFleetTypeResource;
  uid = '';
  updateMode = false;
  logisticsFleetTypeFrm!: FormGroup;
  logisticsFleetRequestFrm?: UpdateLogisticsFleetTypeDto;
  breadcrumbItems!: MenuItem[];

  msgs: Message[] = [];


  constructor(
    private confirmationService: ConfirmationService,
    private logisticsFleetTypeEndpoint: LogisticsFleetTypeEndpoint,
    private appLoadingService: AppLoadingService,
    private appMessageService: AppNotificationService,
    private route: ActivatedRoute,
    private messageService: MessageService
    , private router: Router,
  ) {
    this.logisticsFleetTypeFrm = new FormGroup({

      name: new FormControl(""),
    });
  }

  get logisticsFleetTypeControls() {
    return this.logisticsFleetTypeFrm.controls;
  }

  ngOnInit(): void {

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'Logistics Fleet Type List',
      routerLink: ['/m/logistics/logistics/fleet-type/list']
    });
    this.breadcrumbItems.push({ label: 'Details' });
    this.appLoadingService.startLoading('Proccessing');
    this.route.params.subscribe((params) => {

      if (params['uid']) {
        this.uid = params['uid'];

        this.logisticsFleetTypeEndpoint.findByUid(this.uid).subscribe({
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

  editLogisticsFleetType() {
    this.logisticsFleetTypeControls['name'].patchValue(this.data?.name);


    this.updateMode = true;

  }

  updateLogisticsFleetType() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    const formData: UpdateLogisticsFleetTypeDto = {
      name: this.logisticsFleetTypeControls['name'].value,
    };
    this.appLoadingService.startLoading('Proccessing');

    this.logisticsFleetTypeEndpoint.update(this.uid, formData).subscribe({
      next: (response) => {

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const _data = this.data!;
        this.data = Object.assign(_data, formData);

        this.updateMode = false;
        this.appLoadingService.stopLoading();
      },
      error: (err) => {
        this.appLoadingService.stopLoading();
      }

    });

  }

  deleteLogisticsFleetType() {
    this.appLoadingService.startLoading('Proccessing');

    this.logisticsFleetTypeEndpoint.delete(this.uid).subscribe({
      next: (response) => {
        this.appLoadingService.stopLoading()
        return this.router.navigate(['/m/logistics/logistics/fleet-type/list']);

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
    return this.router.navigate(['/m/logistics/logistics/fleet-type/list']);
  }

  deleteFleet() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.logisticsFleetTypeEndpoint.delete(this.uid).subscribe({
          next: (data) => {
            this.appLoadingService.stopLoading()
            return this.router.navigate(['/m/logistics/logistics/fleet-type/list']);
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
}
