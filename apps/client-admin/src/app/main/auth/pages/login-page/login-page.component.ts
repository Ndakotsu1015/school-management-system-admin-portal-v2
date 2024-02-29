import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LoggerService } from 'apps/client-admin/src/app/api/services/logger.service';
import { Message } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'apps/client-admin/src/app/store/app.state';
import { AppAuthActions } from 'apps/client-admin/src/app/store/auth/auth.action';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  signinForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';
  successMessage = '';
  valCheck: string[] = ['remember'];
  error = '';
  msgs: Message[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private logger: LoggerService,
    private readonly router: Router,
    private authService: AuthService,
    private readonly appStore: Store<AppState>,
  ) {
    this.signinForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

    this.logout();
  }

  showErrorViaMessages() {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: 'Oops!',
      detail: this.error
    });
  }

  onSubmit() {
    console.log(this.signinForm.value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    }

    // Login
    this.loading = true;
    const formData = this.signinForm.value;
    const credentials = {
      email: formData.email,
      password: formData.password
    };

    this.authService.login(credentials).subscribe(
      (data) => {
        this.logger.logInfo('Logged In');
        this.logger.logInfo(data);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.error = error.error.message.message;
        this.logger.logInfo(this.error);
        this.showErrorViaMessages();
        this.loading = false;
      }
    );
  }

  forgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }

  logout() {
    this.appStore.dispatch(AppAuthActions.logout());
  }
}
