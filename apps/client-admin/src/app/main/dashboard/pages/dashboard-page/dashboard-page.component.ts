import { Component, OnInit } from '@angular/core';
import { DasbhoardEndpoint } from 'apps/client-admin/src/app/api/endpoints/dashboard.endpoint';
import { CustomerOrderEndpoint } from 'apps/client-admin/src/app/api/endpoints/order/customer-order.endpoint';
import { DateService } from 'apps/client-admin/src/app/api/services/date.service';
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';
import { E_CustomerOrderStatus } from 'libs/api-interfaces/src/lib/dtos/commerce';
import { DashboardSettingResource } from 'libs/api-interfaces/src/lib/resources/charts';
import { CommodityVariantResource } from 'libs/api-interfaces/src/lib/resources/commodity';
import { CustomerOrderItemResource, CustomerOrderResource } from 'libs/api-interfaces/src/lib/resources/customer';
import { MenuItem } from 'primeng/api';

export interface OrderItemResource {
  uid: string;
  unit_price: number;
  quantity: number;
  status?: string;
  quantity_initiated: number;
  created_at: Date;
  updated_at: Date;
  // relations
  customer_order_id: number;
  customerOrder?: CustomerOrderResource;
  commodity_variant_uid: string; // CommodityVariant.uid
  commodityVariant?: CommodityVariantResource;
}
@Component({
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})


export class DashboardPageComponent implements OnInit {
  data: DashboardSettingResource[] = [];
  breadcrumbItems!: MenuItem[];

  orderBarchartData: any;
  barchartOption: any;
  customerBarchartData: any;

  customerOrders: CustomerOrderResource[] = [];
  orderItems: OrderItemResource[] = [];
  customers: { uid: string, name: string, email: string, status: string, created_at: Date }[] = [];
  sortedCustomers: { uid: string, name: string, email: string, no: number, status: string, created_at: Date }[] = [];

  visible = false;
  isFiltered = false;
  items!: MenuItem[];
  filterItems!: MenuItem[];

  fromDate = null;
  toDate = null;

  doughnutChartData: any;
  doughnutChartOption: any;
  barChartData: any;
  barChartOption: any;


  processedOrders: any[] = [];
  _pendingOrders: any[] = [];
  _processedOrders: any[] = [];
  pendingOrders: any[] = [];
  labels: string[] = [];
  _labels: string[] = [];
  customersName: string[] = [];
  _customersName: string[] = [];
  nos: number[] = [];
  _nos: number[] = [];
  cutomerNos: number[] = [];
  _cutomerNos: number[] = [];

  sortedOrderItem: { variant_uid: string, no: number, name?: string, status: string, created_at: Date }[] = [];

  constructor(
    private dateService: DateService,
    private dashEndpoint: DasbhoardEndpoint,
    private readonly appNotificationService: AppNotificationService,
    private readonly appLoadingService: AppLoadingService,
    private readonly cutomerOrderEndpoint: CustomerOrderEndpoint,
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [];
    this.breadcrumbItems.push({ label: 'Dashboard' });

    this.cutomerOrderEndpoint.getStatisticalData().subscribe({
      next: (response: any) => {
        this.customerOrders = response;

        //loop through to generates the array of cutomers orders and array of ordered items
        this.customerOrders.forEach(item => {
          this.customers.push({ uid: item.customer_uid, name: item.customer_full_name, email: item.customer_email, status: item.status, created_at: item.created_at })
          if (item.orderItems) {
            const odr = item.orderItems.map(itm => ({ ...itm, status: item.status }));
            this.orderItems = [...this.orderItems, ...odr];
          }
          if (item.status === E_CustomerOrderStatus.PROCESSING) {
            this.processedOrders.push(item);

          } else if (item.status === E_CustomerOrderStatus.PENDING) {
            this.pendingOrders.push(item);
          }
        });

        //loop through to find the no. of time that the item was ordered
        let itemArray: { variant_uid: string, no: number, name?: string, status: string, created_at: Date }[] = [];
        this.orderItems.forEach(item => {
          let no = 0;
          this.orderItems.find(orderItem => {
            if (orderItem.commodity_variant_uid === item.commodity_variant_uid) {
              no++
            }
          });

          if (!itemArray.find(ordr => ordr.variant_uid === item.commodity_variant_uid)) {
            itemArray.push({ variant_uid: item.commodity_variant_uid, no: no, name: item?.commodityVariant?.name, status: item.status || '', created_at: item.created_at });
          }

          no = 0;
        });

        //loop throught the sort the item base on the no. orders
        let sortedOrder = [];
        for (let i = 0; i < itemArray.length; i++) {
          let max = itemArray[i]
          for (let j = i; j < this.sortedOrderItem.length; j++) {
            if (max.no < this.sortedOrderItem[j].no) {
              max = itemArray[j]
            }
          }
          if (i < 6) {
            this.labels.push(itemArray[i].name ?? '');
            this.nos.push(itemArray[i].no);
          }
          sortedOrder[i] = max;
        }
        this.sortedOrderItem = [...sortedOrder.slice(0, 5)];

        let customersArray: { uid: string, name: string, email: string, no: number, status: string, created_at: Date }[] = [];
        this.customers.forEach(item => {
          let no = 0;
          this.customers.find(customer => {
            if (customer.uid === item.uid) {
              no++
            }
          });

          if (!customersArray.find(cust => cust.uid === item.uid)) {
            customersArray.push({ ...item, no })
          }
          no = 0;
        });

        let sortedCust = [];
        for (let i = 0; i < customersArray.length; i++) {
          let max = customersArray[i]
          for (let j = i; j < customersArray.length; j++) {
            if (max.no < customersArray[j].no) {
              max = customersArray[j]
            }
          }
          if (i < 6) {
            this.customersName.push(customersArray[i].name);
            this.cutomerNos.push(customersArray[i].no);
          }
          sortedCust[i] = max;
        }

        this.sortedCustomers = [...sortedCust.slice(0, 5)];
      },
      error: (err: any) => {
        this.appNotificationService.showError({
          title: err.error.message.message
        });
        this.appLoadingService.stopLoading();
      },
      complete: () => {
        this.initChart();
      }
    });

    this.dashEndpoint.get(1).subscribe({
      next: (response: any) => {
        this.data = response;
        this.appLoadingService.stopLoading();
      },
      error: (err: any) => {
        this.appNotificationService.showError({
          title: err
        });
        this.appLoadingService.stopLoading();
      }
    });

    this.filterItems = [
      {
        label: 'Links',
        items: [
          {
            label: 'This Week',
            icon: 'pi pi-clock',
            command: () => {
              this.filterByWeek();
            }
          },
          {
            label: 'This Month',
            icon: 'pi pi-question-circle',
            command: () => {
              this.filterByMonth();
            }
          },
          {
            label: 'This Year',
            icon: 'pi pi-question-circle',
            command: () => {
              this.filterByYear();
            }
          },
          {
            separator: true
          },
          {
            label: 'Date Range',
            icon: 'pi pi-question-circle',
            command: () => {
              this.toggleVissibity();
            }
          },
          {
            separator: true
          },
          {
            label: 'Clear Filter',
            icon: 'pi pi-times-circle',
            command: () => {
              this.resetFilter();
            }
          }
        ]
      }
    ];

    this._labels = this.labels;
    this._nos = this.nos;
    this._customersName = this.customersName;
    this._cutomerNos = this.cutomerNos;

    this._processedOrders = this.processedOrders;
    this._pendingOrders = this.pendingOrders;
  }

  initChart() {
    console.log('Pending After Filter,', this.pendingOrders);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const bgColors = [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'),
    documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--pink-500'), documentStyle.getPropertyValue('--red-500')];


    //beginig of doughnutChart
    this.doughnutChartData = {
      labels: [...this.labels],
      datasets: [
        {
          data: [...this.nos],
          backgroundColor: [...bgColors],
          hoverBackgroundColor: [...bgColors]
        }
      ]
    };


    this.doughnutChartOption = {
      cutout: '50%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
    //End of doughnutChart

    //beginig of Barchart
    this.barChartData = {
      labels: [...this.customersName],
      datasets: [
        {
          data: [...this.cutomerNos],
          backgroundColor: [...bgColors],
          hoverBackgroundColor: [...bgColors]
        }
      ]
    };


    this.barChartOption = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
    //End of Barchart

    //gegining of orderBarchart

    this.orderBarchartData = {
      labels: [...this.labels],
      datasets: [
        {
          label: 'Cutomer Orders Bar Chart',
          backgroundColor: [...bgColors],
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [...this.nos]
        },
      ]
    };

    this.customerBarchartData = {
      labels: [...this.customersName],
      datasets: [
        {
          label: 'Cutomer Bar Chart',
          backgroundColor: [...bgColors],
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [...this.cutomerNos]
        },
      ]
    };

    this.barchartOption = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    };

    //end of order barchart

  }

  filterByYear() {
    const date = new Date();
    this.isFiltered = true;
    const yearStartDate = this.dateService.getYearStartDate(date);

    // return weekStartDate.toISOString();

    let filteredData: { variant_uid: string, no: number, name?: string, created_at: Date }[] = [];
    let index = 0
    this.labels = [];
    this.nos = [];
    this.processedOrders = [];
    this.pendingOrders = []
    this.customersName = [];
    this.cutomerNos = [];
    // console.log('Pending B4 Filter,', this.pendingOrders);

    this.sortedOrderItem.find(item => {
      const compared = this.dateService.compareDates(new Date(item.created_at), new Date(yearStartDate))
      if (compared === 1) {
        if (item.status === E_CustomerOrderStatus.PROCESSING) {
          this.processedOrders.push({ item });

        } else if (item.status === E_CustomerOrderStatus.PENDING) {
          this.pendingOrders.push(item);
        }

        if (index < 2) {
          this.labels.push(item.name ?? '');
          this.nos.push(item.no)
        }
        filteredData.push(item);
      }
    });

    let filteredCustomerData: { uid: string, no: number, name?: string, created_at: Date }[] = [];
    this.sortedCustomers.find(item => {
      const compared = this.dateService.compareDates(new Date(item.created_at), new Date(yearStartDate))
      if (compared === 1) {
        if (index < 2) {
          this.customersName.push(item.name ?? '');
          this.cutomerNos.push(item.no)
        }
        filteredCustomerData.push(item);
      }
    });

    this.initChart();
  }

  filterByMonth() {
    const date = new Date();
    this.isFiltered = true;
    const monthStartDate = this.dateService.getMonthStart(date);

    let filteredData: { variant_uid: string, no: number, name?: string, created_at: Date }[] = [];
    let index = 0
    this.labels = [];
    this.pendingOrders = [];
    this.processedOrders = [];
    this.nos = [];
    this.customersName = [];
    this.cutomerNos = [];
    console.log('Pending B4 Filter,', this.pendingOrders);

    this.sortedOrderItem.find(item => {
      const compared = this.dateService.compareDates(new Date(item.created_at), new Date(monthStartDate))
      if (compared === 1) {
        if (item.status === E_CustomerOrderStatus.PROCESSING) {
          this.processedOrders.push(item);
          // console.log('Item', item);
        } else if (item.status === E_CustomerOrderStatus.PENDING) {
          this.pendingOrders.push(this.processedOrders);
        }
        if (index < 2) {
          this.labels.push(item.name ?? '');
          this.nos.push(item.no)
        }
        filteredData.push(item);
      }
    });

    let filteredCustomerData: { uid: string, no: number, name?: string, created_at: Date }[] = [];
    this.sortedCustomers.find(item => {
      const compared = this.dateService.compareDates(new Date(item.created_at), new Date(monthStartDate))
      if (compared === 1) {
        if (index < 2) {
          this.customersName.push(item.name ?? '');
          this.cutomerNos.push(item.no)
        }
        filteredCustomerData.push(item);
      }
    });

    this.initChart();
  }

  filterByWeek() {
    const date = new Date();
    this.isFiltered = true;
    const weekStartDate = this.dateService.getWeeStart(date);
    this.pendingOrders = [];
    this.processedOrders = [];

    // return weekStartDate.toISOString();

    let filteredData: { variant_uid: string, no: number, name?: string, status: string, created_at: Date }[] = [];
    let index = 0
    this.labels = [];
    this.nos = [];
    this.customersName = [];
    this.cutomerNos = [];
    this.sortedOrderItem.find(item => {
      const compared = this.dateService.compareDates(new Date(item.created_at), new Date(weekStartDate))
      if (compared === 1) {
        if (item.status === E_CustomerOrderStatus.PROCESSING) {
          this.processedOrders.push(item);

        } else if (item.status === E_CustomerOrderStatus.PENDING) {
          this.pendingOrders.push(item);
        }
        if (index < 2) {
          this.labels.push(item.name ?? '');
          this.nos.push(item.no)
        }

        filteredData.push(item);
      }


    });

    let filteredCustomerData: { uid: string, no: number, name?: string, created_at: Date }[] = [];
    this.sortedCustomers.find(item => {
      const compared = this.dateService.compareDates(new Date(item.created_at), new Date(weekStartDate))
      if (compared === 1) {
        if (index < 2) {
          this.customersName.push(item.name ?? '');
          this.cutomerNos.push(item.no)
        }
        filteredCustomerData.push(item);
      }
    });

    this.initChart();
  }

  resetFilter() {
    this.labels = this._labels;
    this.nos = this._nos;
    this.customersName = this._customersName;
    this.cutomerNos = this._cutomerNos;
    this.pendingOrders = this._pendingOrders;
    this.processedOrders = this._processedOrders;
    this.isFiltered = false;

    this.initChart();
  }

  filterByRange() {
    const from = this.dateService.convertDate(this.fromDate);
    const to = this.dateService.convertDate(this.toDate);

    let filteredData: { variant_uid: string, no: number, name?: string, created_at: Date }[] = [];
    let index = 0
    this.labels = [];
    this.nos = [];
    this.customersName = [];
    this.cutomerNos = [];
    this.sortedOrderItem.find(item => {
      const compared = this.dateService.compareDateRange(new Date(item.created_at), new Date(from ?? new Date()), new Date(to ?? new Date));
      if (compared === 1) {
        if (item.status === E_CustomerOrderStatus.PROCESSING) {
          this.processedOrders.push(item);

        } else if (item.status === E_CustomerOrderStatus.PENDING) {
          this.pendingOrders.push(item);
        }
        if (index < 2) {
          this.labels.push(item.name ?? '');
          this.nos.push(item.no)
        }

        filteredData.push(item);
      }


    });

    let filteredCustomerData: { uid: string, no: number, name?: string, created_at: Date }[] = [];
    this.sortedCustomers.find(item => {
      const compared = this.dateService.compareDateRange(new Date(item.created_at), new Date(from ?? new Date()), new Date(to ?? new Date));
      if (compared === 1) {
        if (index < 2) {
          this.customersName.push(item.name ?? '');
          this.cutomerNos.push(item.no)
        }
        filteredCustomerData.push(item);
      }
    });

    this.visible = false;
    this.fromDate = null;
    this.toDate = null;

    this.initChart();
  }

  toggleVissibity() {
    this.visible = true;
  }

  goBack() {
    window.history.back();
  }
}
