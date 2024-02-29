import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogisticsProviderEndpoint } from 'apps/client-admin/src/app/api/endpoints/logistics/logistics-provider.endpoint';
import { CustomerOrderEndpoint } from 'apps/client-admin/src/app/api/endpoints/order/customer-order.endpoint';
import { DeliveryOrderEndpoint } from 'apps/client-admin/src/app/api/endpoints/order/delivery-order.endpoint';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { environment } from 'apps/client-admin/src/environments/environment';
import {
  E_DeliveryOrderStatus,
  logisticsProviderUpdateDto
} from 'libs/api-interfaces/src/lib/dtos/commerce';
import { CommodityVariantResource } from 'libs/api-interfaces/src/lib/resources/commodity';
import {
  CustomerOrderItemResource,
  CustomerOrderResource,
  DeliveryOrderItemResource,
  DeliveryOrderResource
} from 'libs/api-interfaces/src/lib/resources/customer';
import { LogisticsProviderResource } from 'libs/api-interfaces/src/lib/resources/logistics';
import {
  ConfirmationService,
  MenuItem,
  Message,
  MessageService
} from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Table } from 'primeng/table';

@Component({
  templateUrl:
    './customer-order-detail-page.component.html',
  styleUrls: ['./customer-order-detail-page.component.scss']
})
export class CustomerOrderDetailPageComponent
  implements OnInit {
  viewDeliveryInfomation = false;
  deliveryInformation!: DeliveryOrderResource;
  breadcrumbItems: MenuItem[] = [];

  imagePrefix = environment.imagePathPrefix;

  loading = false;
  @ViewChild('filter') filter!: ElementRef;
  data?: CustomerOrderResource;
  uid = '';
  updateMode = false;
  customerOrder: FormGroup;
  orderRequestData: any;
  customerOrderItems: CustomerOrderItemResource[] = [];
  deliveryOrderItems: DeliveryOrderItemResource[] = [];
  deliveryOrders: DeliveryOrderResource[] = [];
  commodityVariant: CommodityVariantResource[] = [];
  showItemDetail = false;
  showDeliveryOrderItem = false;
  item?: CustomerOrderItemResource;
  variantName?: string;
  orderedItemsSum = 0;
  deliveredItemsSum = 0;
  unavailableCommodities: {
    uid: string,
    quantity: number
  }[] = [];
  // logistics providers
  logisticsProviderResource: LogisticsProviderResource[] =
    [];
  logisticsProviderForm!: FormGroup;

  msgs: Message[] = [];
  alert: Message[] = [];

  // to display the modal
  visible!: boolean;
  visible2!: boolean;
  visible3!: boolean;
  position!: string;
  is_order_completed!: boolean;
  warehouse_has_complete_stock!: boolean;
  messages: [] = [];
  commodity_exists_in_stock!: boolean;

  constructor(
    private confirmationService: ConfirmationService,

    private customerOrderEndpoint: CustomerOrderEndpoint,
    private appLoadingService: AppLoadingService,
    private appMessageService: AppNotificationService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private readonly deliveryOrderEndpoint: DeliveryOrderEndpoint,
    private router: Router, // private customerOrderItemEndpoint: CustomerOrderItem
    // logistic provider endpoint
    private logisticsProviderEndpoint: LogisticsProviderEndpoint
  ) {
    this.customerOrder = new FormGroup({
      uid: new FormControl(),
      status: new FormControl(''),
      is_paid: new FormControl(''),
      payment_ref: new FormControl(''),
      created_at: new FormControl(''),
      updated_at: new FormControl(''),
      customer_id: new FormControl('')
    });

    // logistics provider form validate

    this.logisticsProviderForm = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  }

  get customerOrderControls() {
    return this.customerOrder.controls;
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

    this.appLoadingService.startLoading('Proccessing');
    this.route.params.subscribe((params) => {
      if (params['uid']) {
        this.uid = params['uid'];

        this.customerOrderEndpoint
          .findByUid(this.uid)
          .subscribe({
            next: (response) => {
              this.data = response;
              this.customerOrderItems =
                this.data?.orderItems ?? [];
              this.deliveryOrders =
                this.data.deliveryOrders ?? [];

              this.customerOrderItems.forEach((item) => {
                this.orderedItemsSum += item.quantity;
              });

              this.deliveryOrders.forEach((order) => {
                order.deliveryOrderItems?.forEach((item) => {
                  this.deliveredItemsSum += item.quantity
                })
              });

              this.is_order_completed = this.deliveredItemsSum < this.orderedItemsSum ? false : true;

              this.appLoadingService.stopLoading();
            },
            error: (error) => {
              this.appLoadingService.stopLoading();
            }
          });
      }
      this.appLoadingService.stopLoading();
    });
  }

  changeDeliveryStatus(status: string) {
    let statusDelivery: E_DeliveryOrderStatus;
    if (status == 'approved') {
      statusDelivery = E_DeliveryOrderStatus.APPROVED;
    } else if (status === 'ready-for-shipping') {
      statusDelivery =
        E_DeliveryOrderStatus.READY_FOR_SHIPPING;
    } else if (status === 'delivery-agent-assigned') {
      statusDelivery =
        E_DeliveryOrderStatus.DELIVERY_AGENT_ASSIGNED;
    } else if (status === 'shipped') {
      statusDelivery = E_DeliveryOrderStatus.SHIPPED;
    } else if (status === 'delivered') {
      statusDelivery = E_DeliveryOrderStatus.DELIVERED;
    } else {
      statusDelivery = E_DeliveryOrderStatus.PENDING;
    }

    const data = {
      uid: this.deliveryInformation.uid,
      status: statusDelivery
    };

    console.log('approve data', data);

    this.deliveryOrderEndpoint
      .approve(data.uid, data.status)
      .subscribe({
        next: (response) => {
          console.log('Resp', response)
          this.deliveryInformation = response;
          this.appMessageService.showSuccess({
            title: 'Success',
            detail: 'Operation Successfully!'
          });
          location.reload();
        },
        error: (error) => {
          this.appMessageService.showError({
            title: 'Error',
            detail: error.error.message.message
          });
        }
      });
  }

  goBack() {
    return this.router.navigate([
      '/m/order/customer-order/list'
    ]);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  viewDeliveryInfo() {
    this.viewDeliveryInfomation = true;
  }
  cancelViewDeliveryInfo() {
    this.viewDeliveryInfomation = false;
  }

  viewOrderItemDetail(data: CustomerOrderItemResource) {
    this.visible2 = true;
    this.variantName = data.commodityVariant?.name;
    this.item = data;
    this.showItemDetail = true;
  }

  viewDeliveryOrderItemDetail(
    deliveryOrder: DeliveryOrderResource
  ) {
    this.unavailableCommodities = [];
    this.deliveryInformation = deliveryOrder;
    this.deliveryOrderItems = deliveryOrder.deliveryOrderItems ?? [];
    this.showDeliveryOrderItem = true;

    const warehouseCommodities = this.deliveryInformation.warehouse?.warehouseCommodityStocks;

    const existsInCommodities = this.deliveryOrderItems.some(item =>
      warehouseCommodities?.some(commodity =>
        commodity.commodity_variant_uid === item.commodity_variant_uid
      )
    );

    console.log('commodity exists in warehouse db:', existsInCommodities);
    this.alert.push({
      severity: 'primary',
      detail: 'Awaiting delivery chaarges payment!'
    });

    this.msgs = [];
    if (existsInCommodities) {
      this.commodity_exists_in_stock = true;
      this.unavailableCommodities.push(...this.deliveryOrderItems
        .filter(item => warehouseCommodities?.some(commodity =>
          commodity.commodity_variant_uid === item.commodity_variant_uid &&
          item.quantity > commodity.quantity
        ))
        .map(({ uid, quantity }) => ({ uid, quantity }))
      );

      console.log('pushed...', this.unavailableCommodities);
      if (this.unavailableCommodities.length < 1) {
        this.warehouse_has_complete_stock = true
        return
      }

      this.msgs.push({
        severity: 'warn',
        detail: 'The selected warehouse(' + (this.deliveryInformation.warehouse ? this.deliveryInformation.warehouse.name : '') + ') does not have complete stock. Consider restocking!'
      });
      this.warehouse_has_complete_stock = false
    } else {
      this.msgs.push({
        severity: 'warn',
        detail: 'The selected warehouse(' + (this.deliveryInformation.warehouse ? this.deliveryInformation.warehouse.name : '') + ') does not have complete stock. Consider restocking!'
      });
      this.warehouse_has_complete_stock = false
      this.commodity_exists_in_stock = false;
    }

    console.log('does warehouse has available commodity?: ', this.warehouse_has_complete_stock);
  }

  // cancel() {
  //   this.showItemDetail = false;
  // }

  cancel(stateToToggle: string) {
    this.viewDeliveryInfomation = false;
    if (stateToToggle === 'itemDetail') {
      this.showItemDetail = !this.showItemDetail;
    } else if (stateToToggle === 'deliveryOrderItem') {
      this.showDeliveryOrderItem =
        !this.showDeliveryOrderItem;
    }
  }

  initiateDeliveryOrder() {
    this.appLoadingService.startLoading('Processing...');
    if (this.data?.status === 'pending') {
      this.customerOrderEndpoint
        .setAsProcessing(this.uid)
        .subscribe({
          next: (response) => {
            this.appLoadingService.stopLoading();
            return this.router.navigate([
              '/m/order/customer-order/delivery',
              this.uid
            ]);
          },
          error: (error) => {
            this.appMessageService.showError({
              title: 'An error occurred!',
              detail: error.message.message
            });
            this.appLoadingService.stopLoading();
          }
        });
    }

    this.router.navigate([
      '/m/order/customer-order/delivery',
      this.uid
    ]);
  }

  // display the logistics providers in a modal
  showLogisticsProvider(status: string, position: string) {
    this.visible = true;
    this.position = position;
    let statusDe: E_DeliveryOrderStatus;
    if (status == 'ready-for-shipping') {
      statusDe = E_DeliveryOrderStatus.READY_FOR_SHIPPING;
    } else {
      statusDe = E_DeliveryOrderStatus.PENDING;
    }
    this.logisticsProviderEndpoint.list().subscribe({
      next: (response) => {
        this.logisticsProviderResource = response;
      },
      error: (error) => {
        // this.appLoadindingService.stopLoading();
      }
    });
  }

  // assign logistics provider
  assignLogisticsProvider() {
    const formData = this.logisticsProviderForm.value;

    const payload: logisticsProviderUpdateDto = {
      delivery_order_uid: this.deliveryInformation.uid,
      logistics_provider_uid: formData.name
    };


    this.appLoadingService.startLoading('Loading');
    this.deliveryOrderEndpoint
      .assignLogisticsProvider(
        payload.delivery_order_uid,
        payload.logistics_provider_uid
      )
      .subscribe({
        next: (response) => {
          this.appLoadingService.stopLoading();
          this.deliveryInformation = response;
          this.appMessageService.showSuccess({
            title: 'Success',
            detail: 'Operation Successfully!'
          });
          this.visible = false;
        },
        error: (error) => {
          this.appLoadingService.stopLoading();
          this.appMessageService.showError({
            title: 'Error',
            detail: error.error.message.message
          });
        }
      });
  }

  // initiate stock transfer
  initiateStockTransfer() {
    this.router.navigate([
      '/m/warehouse/warehouse/commodity-stock/new'
    ]);
  }
}
