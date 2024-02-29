import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppLayoutService } from '../../services/app-layout.service';
import { AppLoadingService } from 'apps/client-portal/src/app/store/services/app-loading.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AppState } from 'apps/client-portal/src/app/store/app.state';
import { AppAuthActions } from 'apps/client-portal/src/app/store/auth/auth.action';

@Component({
  selector: 'app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.scss'],
})
export class AppTopBarComponent implements OnInit {
  items!: MenuItem[];
  notificationItems!: MenuItem[];
  selectedNotification!: MenuItem;

  isClientBudgeting: boolean = false;
  isClientBureau: boolean = false;
  isClientMda: boolean = false;

  user = this.authService.user;

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: AppLayoutService,
    private readonly appStore: Store<AppState>,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly appLoadingService: AppLoadingService
  ) { }

  ngOnInit() {
    this.notificationItems = [
      {
        label: 'Notification 1',
        routerLink: '/notification/notifications',
      },
      {
        label: 'Notification 2',
        routerLink: '/notification/notifications',
      },
      {
        label: 'Notification 3',
        routerLink: '/notification/notifications',
      },
    ];

    this.items = [
      {
        label: 'Links',
        items: [
          {
            label: 'My Profile',
            icon: 'pi pi-user',
            command: () => {
              this.goToProfile();
            },
          },
          {
            label: 'Help',
            icon: 'pi pi-question-circle',
            url: '',
          },
          {
            separator: true,
          },
          {
            label: 'Log out',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logout();
            },
          },
        ],
      },
    ];
  }

  logout() {
    this.appStore.dispatch(AppAuthActions.logout())
    this.router.navigate(['/auth/login']);
  }


  onNotificationSelect(event: any) {
    this.router.navigate(['']);
  }

  goToProfile() {
    let userUid: string;

    // this.authService.user$.subscribe(user => {
    //   if (user) {
    //     userUid = user.uid;
    //   }

    //   this.router.navigate([`/module/bureau/bureau/user/users/profile/${userUid}`]);
    // });

  }

}
