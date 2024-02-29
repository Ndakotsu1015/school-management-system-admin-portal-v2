/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { AppLayoutService } from '../../services/app-layout.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'apps/client-admin/src/app/store/app.state';
import { AppAuthActions } from 'apps/client-admin/src/app/store/auth/auth.action';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];
  model2: any[] = [];

  constructor(
    public layoutService: AppLayoutService,
    private readonly appStore: Store<AppState>,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.model = [
      // {
      //   items: [
      //     { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
      //     { label: 'MDAs', icon: 'assets/images/logos/Icons/office-building.png', height: '25', padding: 'pt-2 pl-2',  routerLink: ['/module/mda/mdas/list'] },
      //     { label: 'Vendors', icon: 'assets/images/logos/Icons/excavator.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/module/vendor/vendors/list'] },
      //     { label: 'Appropriations', icon: 'assets/images/logos/Icons/bar-chart.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/module/dashboard'] },
      //     { label: 'Procurement cycles', icon: 'assets/images/logos/Icons/refresh.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/module/procurement/procurements/list'] },
      //     { label: 'Tendering', icon: 'assets/images/logos/Icons/auction.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/module/dashboard'] },
      //     { label: 'Projects', icon: 'assets/images/logos/Icons/rocket.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/module/user/users/list'] },
      //     { label: 'User administration', icon: 'assets/images/logos/Icons/management.png', height: '25', padding: 'pt-2 pl-2', routerLink: ['/module/bureau/user/users/list'] },
      //   ]
      // },

      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/dashboard']
          }
        ]
      },
      {
        label: 'Inventory Management',
        items: [
          {
            label: 'Commodity Management',
            icon: 'pi pi-fw pi-list',
            items: [
              {
                label: 'Commodities',
                icon: 'pi pi-fw pi-circle-fill',
                items: [
                  {
                    label: 'List',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: ['/m/commodity/item/list']
                  },
                  {
                    label: 'New',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: ['/m/commodity/item/new']
                  }
                ]
              },
              {
                label: 'Commodity Variant',
                icon: 'pi pi-fw pi-circle-fill',
                items: [
                  {
                    label: 'List',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: [
                      '/m/commodity/variant/list'
                    ]
                  },
                  {
                    label: 'New',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: ['/m/commodity/variant/new']
                  }
                ]
              },
              {
                label: 'Categories',
                icon: 'pi pi-fw pi-circle-fill',
                items: [
                  {
                    label: 'List',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: [
                      '/m/commodity/category/list'
                    ]
                  },
                  {
                    label: 'New',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: [
                      '/m/commodity/category/new'
                    ]
                  }
                ]
              },
            ]
          },
          {
            label: 'Warehouse Management',
            icon: 'pi pi-fw pi-list',
            items: [
              {
                label: 'Warehouses',
                items: [
                  {
                    label: 'List',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: [
                      '/m/warehouse/warehouse/list'
                    ]
                  },
                  {
                    label: 'New',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: [
                      '/m/warehouse/warehouse/new'
                    ]
                  }
                ]
              },
              {
                label: 'Warehouse-Owner',
                items: [
                  {
                    label: 'List',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: [
                      '/m/warehouse/warehouse/owner/list'
                    ]
                  },
                  {
                    label: 'New',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: [
                      '/m/warehouse/warehouse/owner/new'
                    ]
                  }
                ]
              }
            ]
          },
          {
            label: 'Stock Management',
            icon: 'pi pi-fw pi-list',
            items: [
              {
                label: 'Commodity Stock',
                items: [
                  {
                    label: 'List',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: [
                      '/m/warehouse/warehouse/commodity-stock/list'
                    ]
                  },
                  {
                    label: 'New',
                    icon: 'pi pi-fw pi-circle',
                    routerLink: [
                      '/m/warehouse/warehouse/commodity-stock/new'
                    ]
                  }
                ]
              },
            ]
          },
        ]
      },
      {
        label: 'Order Management',
        items: [
          {
            label: 'Customer Orders',
            icon: 'pi pi-fw pi-list',
            items: [
              {
                label: 'List',
                icon: 'pi pi-fw pi-circle',
                routerLink: ['/m/order/customer-order/list']
              }
            ]
          }
        ]
      },
      {
        label: 'Customer Management',
        items: [
          {
            label: 'List',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/m/customer/customer/list']
          }
        ]
      },
      {
        label: 'Human Resources',
        items: [
          {
            label: 'Staff Management',
            items: [
              {
                label: 'List',
                icon: 'pi pi-fw pi-circle',
                routerLink: ['/m/hr/staff/list']
              },
              {
                label: 'New',
                icon: 'pi pi-fw pi-circle',
                routerLink: ['/m/hr/staff/new']
              }
            ]
          }
        ]
      },
      {
        label: 'User Management',
        items: [
          {
            label: 'Users',
            items: [
              {
                label: 'List',
                icon: 'pi pi-fw pi-circle',
                routerLink: ['/m/user/users/list']
              },
              {
                label: 'New',
                icon: 'pi pi-fw pi-circle',
                routerLink: ['/m/user/users/new']
              }
            ]
          },
          {
            label: 'User Groups',
            items: [
              {
                label: 'List',
                icon: 'pi pi-fw pi-circle',
                routerLink: ['/m/user/groups/list']
              },
              {
                label: 'New',
                icon: 'pi pi-fw pi-circle',
                routerLink: ['/m/user/groups/new']
              }
            ]
          },
        ]
      },
      {
        label: 'Logistics',
        items: [
          {
            label: 'Fleet Type',
            items: [{
              label: 'List',
              icon: 'pi pi-fw pi-circle',
              routerLink: ['/m/logistics/logistics/fleet-type/list']
            },
            {
              label: 'New',
              icon: 'pi pi-fw pi-circle',
              routerLink: ['/m/logistics/logistics/fleet-type/new']
            }],

          },
          {
            label: 'Logistics Provider',
            items: [{
              label: 'List',
              icon: 'pi pi-fw pi-circle',
              routerLink: ['/m/logistics/logistics/provider/list']
            },
            {
              label: 'New',
              icon: 'pi pi-fw pi-circle',
              routerLink: ['/m/logistics/logistics/provider/new']
            }]
          },

        ]
      },
      {
        label: 'Settings',
        items: [
          {
            label: 'Delivery Setting',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/m/settings/general-settings/delivery-settings']
          },
          {
            label: 'Measuring Unit',
            icon: 'pi pi-fw pi-circle',
            routerLink: ['/m/settings/measuring/measuring-units']
          },
        ]
      },
    ];

    this.model2 = [
      {
        items: [
          { label: 'Toggle sidebar', icon: 'pi pi-fw pi-bars', routerLink: ["''"], command: () => { this.togleSidebar(); } },
          { label: 'Logout', icon: 'pi pi-fw pi-sign-out', routerLink: ['/auth/login'] },
        ]
      },
    ];
  }

  logout() {
    this.appStore.dispatch(AppAuthActions.logout())
    this.router.navigate(['/auth/login']);
  }
  togleSidebar() {
    this.layoutService.onMenuToggle()
  }
}
