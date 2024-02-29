import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthEndpoint } from 'apps/client-admin/src/app/api/endpoints/auth.endpoint';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppLoadingService } from 'apps/client-admin/src/app/store/services/app-loading.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'hacienda-platform-forgot-password-start',
  templateUrl: './forgot-password-start.component.html',
  styleUrls: ['./forgot-password-start.component.scss']
})
export class ForgotPasswordStartComponent
  implements OnInit
{
  recoveryForm: FormGroup;

  msgs: Message[] = [];
  detailMsg =
    'A password reset link has been sent to the email address provided';
  error = '';

  expiredTokenMessage = '';

  constructor(
    private _formBuilder: FormBuilder,
    private appLoadingService: AppLoadingService,
    private authEndpoint: AuthEndpoint,
    private activatedroute: ActivatedRoute
  ) {
    this.recoveryForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.appLoadingService.startLoading('Loading...');

    this.activatedroute.data.subscribe({
      next: (res) => {
        this.appLoadingService.stopLoading();
        this.expiredTokenMessage = res['message'];

        // only show this error message when the expired-token is visited
        if (this.expiredTokenMessage) {
          this.showErrorViaMessages(
            this.expiredTokenMessage
          );
        }
      },
      error: (error) => {
        this.appLoadingService.stopLoading();
        console.log(error);
      }
    });
  }

  showSuccessViaMessages() {
    this.msgs = [];
    this.msgs.push({
      severity: 'success',
      summary: '',
      detail: this.detailMsg
    });
  }

  showErrorViaMessages(error: any) {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: '',
      detail: error
    });
  }

  onSubmit() {
    this.appLoadingService.startLoading('Loading');
    const formData = this.recoveryForm.value;
    const recoveryFormDetails = {
      email: formData.email
    };

    this.authEndpoint
      .sendRecoveryEmail(recoveryFormDetails)
      .subscribe(
        (data) => {
          this.appLoadingService.stopLoading();
          this.showSuccessViaMessages();
        },
        (error) => {
          this.error = error.error.message;
          this.showErrorViaMessages(this.error);
          this.appLoadingService.stopLoading();
        }
      );
  }
}
