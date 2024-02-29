import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerOrderEndpoint } from 'apps/client-admin/src/app/api/endpoints/order/customer-order.endpoint';
import { DeliveryOrderEndpoint } from 'apps/client-admin/src/app/api/endpoints/order/delivery-order.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { CustomerOrderResource } from 'libs/api-interfaces/src/lib/resources/customer';
import {
  ConfirmationService,
  MenuItem,
  Message,
  MessageService
} from 'primeng/api';

@Component({
  selector:
    'hacienda-platform-customer-delivery-order-page',
  templateUrl:
    './customer-delivery-order-page.component.html',
  styleUrls: [
    './customer-delivery-order-page.component.scss'
  ]
})
export class CustomerDeliveryOrderPageComponent
  implements OnInit
{
  loading = false;
  @ViewChild('filter') filter!: ElementRef;
  data?: CustomerOrderResource;
  uid = '';
  msgs: Message[] = [];
  breadcrumbItems: MenuItem[] = [];

  // allocate commodity variables
  allocationForm: FormGroup;
  itemsOrdered: any;
  deliveryOrderList: any[] = [];
  displayPopup = false;
  selectedDate!: Date;
  today!: Date;
  customerOrderUid = '';
  orderedQuantity = 0;
  quantityInitiated = 0;
  quantityLeft = 0;
  customerOrderItemUid = '';

  constructor(
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private confirmationService: ConfirmationService,
    private customerOrderEndpoint: CustomerOrderEndpoint,
    private appMessageService: AppNotificationService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder,
    private deliveryOrderEndpoint: DeliveryOrderEndpoint
  ) {
    this.allocationForm = this.fb.group({
      commodity: this.fb.control('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      quantity: this.fb.control('', [
        Validators.required,
        Validators.maxLength(this.orderedQuantity)
      ])
    });

    // date to start from today
    this.today = new Date();
  }

  get allocationFormControl() {
    return this.allocationForm.controls;
  }

  ngOnInit(): void {

    this.breadcrumbItems = [];
    this.breadcrumbItems.push({
      label: 'Dashboard',
      routerLink: ['/main/dashboard']
    });
    this.breadcrumbItems.push({
      label: 'Commodity Order List',
      routerLink: [
        '/m/order/customer-order/list'
      ]
    });
    this.breadcrumbItems.push({
      label: 'Commodity Order Details',
    });
    
    this.appLoadingService.startLoading('Processing');
    this.route.params.subscribe((params) => {
      if (params['uid']) {
        this.uid = params['uid'];

        this.customerOrderEndpoint
          .findByUid(this.uid)
          .subscribe({
            next: (response) => {
              this.data = response;
              this.customerOrderUid = this.data.uid;

              // get order items
              this.itemsOrdered =
                this.data?.orderItems?.map((item) => {
                  return {
                    label: item?.commodityVariant?.name,
                    value: item?.commodityVariant?.uid,
                    uid: item?.uid,
                    quantity: item?.quantity,
                    quantityInitiated:
                      item?.quantity_initiated
                  };
                });

              this.appLoadingService.stopLoading();
            },
            error: (error) => {
              this.appLoadingService.stopLoading();
              console.log(error.error.message);
            }
          });
      }
      this.appLoadingService.stopLoading();
    });

    // subscribe to valueChanges of the form
    this.allocationForm.valueChanges.subscribe(() => {
      const searchUid =
        this.allocationFormControl['commodity'].value.value;
      const result = this.itemsOrdered.find(
        (item: { value: any }) => item.value === searchUid
      );
      this.orderedQuantity = result.quantity;
      this.quantityInitiated = result.quantityInitiated;
      this.quantityLeft =
        this.orderedQuantity - this.quantityInitiated;
    });
  }

  goBack() {
    return this.router.navigate([
      '/m/order/customer-order/detail',
      this.data?.uid
    ]);
  }

  // allocate commodity logic
  addDeliveryOrder(allocationForm: FormGroup) {
    const isFound = this.deliveryOrderList.some(
      (item) =>
        item.commodity ===
        this.allocationFormControl['commodity'].value
    );
    const hasExceededTotalOrderedItems =
      this.deliveryOrderList.length ==
      this.data?.orderItems?.length;

    const totalQuantity =
      this.quantityInitiated +
      this.allocationFormControl['quantity'].value;

    if (totalQuantity > this.orderedQuantity) {
      this.appNotificationService.showWarning({
        title: 'Warning',
        detail: `Quantity left to deliver is ${this.quantityLeft}`
      });
      return;
    }
    if (allocationForm.invalid) {
      this.appNotificationService.showWarning({
        title: 'Warning',
        detail:
          'Please select commodity and valid order quantity before adding'
      });
      return;
    }

    if (hasExceededTotalOrderedItems) {
      this.appNotificationService.showError({
        title: 'Error',
        detail:
          'You have exceeded total number of ordered items (' +
          this.data?.orderItems?.length +
          ')'
      });
      return;
    }

    if (isFound) {
      this.appNotificationService.showWarning({
        title: 'Warning',
        detail:
          'Duplicate entry, already added ' +
          this.allocationFormControl['commodity'].value
            .label
      });
      return;
    }

    this.deliveryOrderList.push({
      commodity:
        this.allocationFormControl['commodity'].value,
      quantity: this.allocationFormControl['quantity'].value
    });

    this.appNotificationService.showSuccess({
      title: 'Success',
      detail: 'Added item successfully'
    });
  }

  removeDeliveryOrder(index: number) {
    this.deliveryOrderList.splice(index, 1);
  }

  showPopup() {
    this.displayPopup = true;
  }

  hidePopup() {
    this.displayPopup = false;
  }

  save() {
    // formatting data
    const items = this.deliveryOrderList.map((item) => {
      let newInitiatedQuantity =
        item?.quantity + item?.commodity.quantityInitiated;
      return {
        uid: item?.commodity?.uid,
        commodity_variant_uid: item?.commodity?.value,
        quantity: item?.quantity,
        sumQuantityInitiated: newInitiatedQuantity
      };
    });

    const submissionData = {
      items: items,
      customer_order_uid: this.customerOrderUid,
      estimated_delivery_date: this.selectedDate
    };

    // send the form data to the backend API
    this.appLoadingService.startLoading('Saving Data...');
    this.deliveryOrderEndpoint
      .create(submissionData)
      .subscribe({
        next: (data) => {
          // handle the response on success
          this.appLoadingService.stopLoading();
          this.appNotificationService.showSuccess({
            title: 'Operation successful',
            detail: 'New Allocation created successfully'
          });
          this.allocationForm.reset();
          this.router.navigate([
            'm/order/customer-order/detail/',
            this.uid
          ]);
        },
        error: (error) => {
          // handle the response on error
          this.appNotificationService.showError({
            title: error.error.error,
            detail: error.error.message
          });
          this.appLoadingService.stopLoading();
        }
      });
  }
}
