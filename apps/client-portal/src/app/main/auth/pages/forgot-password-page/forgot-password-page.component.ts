import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordDto } from '@nti-idcard-platform/api-interfaces';
import { AppNotificationService } from 'apps/client-portal/src/app/store/services/app-notification.service';

@Component({
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent implements OnInit {
  sent = false;
  email = '';
  resetForm: FormGroup = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.email])
  });

  constructor(
    private readonly fb: FormBuilder,
    // private readonly authEndpoint: AuthEndpoint,
    private readonly appNotificationService: AppNotificationService,
  ) { }

  ngOnInit(): void { }

  doReset() {
    const payload: ForgotPasswordDto = {
      email: this.resetForm.controls["username"].value
    }
    // this.authEndpoint.forgotPassword(payload).subscribe({
    //   next: () => {
    //     console.log('DONE')
    //     this.email = payload.email
    //     this.sent = true
    //     this.appNotificationService.showSuccess({
    //       title: "Email Sent",
    //       detail: `check ${this.email}`,
    //     });
    //   },
    //   error: () => {
    //     this.email = payload.email
    //     this.sent = true;
    //     this.appNotificationService.showSuccess({
    //       title: "Email Sent",
    //       detail: `check ${this.email}`,
    //     });
    //   }
    // });

  }
}
