/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogisticsFleetTypeEndpoint } from 'apps/client-admin/src/app/api/endpoints/logistics/logistics-fleet-type.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { MenuItem } from 'primeng/api';

@Component({
  templateUrl:
    './logistics-fleet-type-new-page.component.html',
  styleUrls: [
    './logistics-fleet-type-new-page.component.scss'
  ]
})
export class LogisticsFleetTypeNewPageComponent
  implements OnInit {

  logisticsFleetForm: FormGroup;
  fleetRequestFrm: any;
  breadcrumbItems!: MenuItem[];

  constructor(private appLoadingService: AppLoadingService,
    private appMessageService: AppNotificationService,
    private logisticsFleetTypeEndpoint: LogisticsFleetTypeEndpoint,
    private readonly appNotificationService:
      AppNotificationService,
    private route: ActivatedRoute
    , private router: Router) {


    this.logisticsFleetForm = new FormGroup({
      uid: new FormControl(),
      name: new FormControl("")
    });


  }


  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
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
    this.breadcrumbItems.push({ label: 'Add New' });
  }

  goToLogisticsFleetTypeList() { }

  goBack() {
    this.router.navigate(['/m/logistics/logistics/fleet-type/list']);
  }


  get logisticsFleetFormControls() {
    return this.logisticsFleetForm.controls;
  }

  addLogisticsFleetType() {
    const frmFleetData = {
      name: this.logisticsFleetFormControls['name'].value,
      uid: this.logisticsFleetFormControls['uid'].value,

    };

    this.fleetRequestFrm = frmFleetData;


    this.appLoadingService.startLoading('Proccessing');

    this.logisticsFleetTypeEndpoint.create(this.fleetRequestFrm).subscribe({
      next: (response) => {
        this.appLoadingService.stopLoading();

        this.appNotificationService.showSuccess({
          title: "Success",
          detail: "Logistics Fleet Type Record Added Successfully!"
        });
        this.logisticsFleetForm.reset();
        this.appLoadingService.stopLoading();


        this.router.navigate(['/m/logistics/logistics/fleet-type/list']);

      },
      error: (err) => {
        this.appLoadingService.stopLoading();

        this.appNotificationService.showError({
          title: err.error.message.error,
          detail: err.error.message.message
        })

      }

    });



  }
}
