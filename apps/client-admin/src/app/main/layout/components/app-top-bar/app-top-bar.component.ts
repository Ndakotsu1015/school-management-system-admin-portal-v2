import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';
import { AppLayoutService } from '../../services/app-layout.service';
import { Store } from '@ngrx/store';
import { AppState } from 'apps/client-admin/src/app/store/app.state';
import { AppAuthActions } from 'apps/client-admin/src/app/store/auth/auth.action';
import { UserNotificationEndpoint } from 'apps/client-admin/src/app/api/endpoints/user/user-notification.endpoint';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.scss'],
})
export class AppTopBarComponent {
  items!: MenuItem[];
  notificationItems!: any | undefined [];
  notifications!: any | undefined [];
  selectedNotification!: MenuItem;
  ref: DynamicDialogRef | undefined;

  user = this.authService.user;

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: AppLayoutService,
    private authService: AuthService,
    private router: Router,
    private readonly appStore: Store<AppState>,
    private notificationEndpoint: UserNotificationEndpoint,
    public dialogService: DialogService,
    public messageService: MessageService,
  ) {}

  ngOnInit() {
    this.notificationEndpoint.list().subscribe(data => {
      if (data) {
        this.notificationItems = data?.filter((m) => m.is_read == false)
      }
    });

    this.items = [
      {
        label: 'Links',
        items: [
          {
            label: 'My Profile',
            icon: 'pi pi-user',
            command: () => {
              this.goToProfile();
            }
          },
          {
            label: 'Help',
            icon: 'pi pi-question-circle',
            url: ''
          },
          {
            separator: true
          },
          {
            label: 'Log out',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logout();
            }
          }
        ]
      }
    ];
  }


  logout() {
    this.appStore.dispatch(AppAuthActions.logout())
    this.router.navigate(['/auth/login']);
  }

  onNotificationSelect(event: any) {
    // this.router.navigate(['/']);
    console.log('go to notification')
  }

  goToProfile() {
    let userUid: string;

    this.authService.user$.subscribe(user => {
      if (user) {
        userUid = user.uid;
      }

      this.router.navigate([`/dashboard`]);
    });

  }

  showModal(notificationItem: any) {
    this.ref = this.dialogService.open(notificationItem, {
        data: notificationItem.content,
        header: notificationItem.content,
        width: '50%',
        contentStyle: { overflow: 'auto',  },
        baseZIndex: 10000,
        maximizable: true,
        position: 'top',
    });

    this.ref.onMaximize.subscribe((value) => {
        this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
  }
}
