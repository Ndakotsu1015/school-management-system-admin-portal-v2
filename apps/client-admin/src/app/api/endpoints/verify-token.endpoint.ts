import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminDtos } from '@hacienda-platform/api-interfaces';
import { Observable } from 'rxjs';
import { apiBaseUrl } from './api';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenEndpoint {
  baseUrl = `${apiBaseUrl}/api/admin/auth/verify-token`;

  constructor(private readonly httpClient: HttpClient) { }

  verifyToken(
    resetToken: string,
    email: string
  ): Observable<AdminDtos.AdminAuthForgotPasswordVerifyTokenResponseDto> {
    return this.httpClient.get<AdminDtos.AdminAuthForgotPasswordVerifyTokenResponseDto>(
      `${this.baseUrl}/${resetToken}/${email}`
    );
  }
}
