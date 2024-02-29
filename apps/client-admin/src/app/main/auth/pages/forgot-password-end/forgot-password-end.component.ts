import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDtos } from '@hacienda-platform/api-interfaces';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthEndpoint } from 'apps/client-admin/src/app/api/endpoints/auth.endpoint';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LoggerService } from 'apps/client-admin/src/app/api/services/logger.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppNotificationService } from 'apps/client-admin/src/app/store/services/app-notification.service';

@Component({
  selector: 'hacienda-platform-forgot-password-end',
  templateUrl: './forgot-password-end.component.html',
  styleUrls: ['./forgot-password-end.component.scss']
})
export class ForgotPasswordEndComponent implements OnInit {
  resetPasswordForm: FormGroup;

  error = '';

  verificationDetails!: AdminDtos.AdminAuthForgotPasswordVerifyTokenResponseDto;

  constructor(
    private _formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly logger: LoggerService,
    private readonly router: Router,
    private appLoadingService: AppLoadingService,
    private appNotificationService: AppNotificationService,
    private authEndpoint: AuthEndpoint
  ) {
    this.resetPasswordForm = this._formBuilder.group({
      newpassword: [
        '',
        [Validators.required, Validators.minLength(5)]
      ]
    });
  }

  ngOnInit(): void {
    console.log('Initializing...');

    this.route.data.subscribe({
      next: (data) => {
        this.verificationDetails = data['records'];
        // console.log(this.verificationDetails);
      }
    });
  }

  onSubmit() {
    this.appLoadingService.startLoading('Loading');

    const formData = this.resetPasswordForm.value;

    const changePasswordFormDetails = {
      email: this.verificationDetails.email,
      password: formData.newpassword
    };

    this.authEndpoint
      .changePassword(changePasswordFormDetails)
      .subscribe({
        next: (response) => {
          this.appLoadingService.stopLoading();

          this.appNotificationService.showSuccess({
            title: 'Password change successful',
            detail:
              'Please login again with your new credentials'
          });

          this.redirectToLogin();

          return response;
        },
        error: (error) => {
          this.error = error.error.message;
          // this.showErrorViaMessages(this.error);
          this.appLoadingService.stopLoading();
        }
      });
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
