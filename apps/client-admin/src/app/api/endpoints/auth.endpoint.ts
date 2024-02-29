import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminDtos } from '@hacienda-platform/api-interfaces';
import { Observable } from 'rxjs';
import { apiBaseUrl } from './api';

@Injectable({
  providedIn: 'root'
})
export class AuthEndpoint {
  baseUrl = `${apiBaseUrl}/api/admin/auth`;

  constructor(private readonly httpClient: HttpClient) { }

  login(
    payload: AdminDtos.AdminAuthLoginRequestDto
  ): Observable<AdminDtos.AdminAuthLoginResponseDto> {
    return this.httpClient.post<AdminDtos.AdminAuthLoginResponseDto>(
      `${this.baseUrl}/login`,
      payload
    );
  }

  sendRecoveryEmail(
    payload: AdminDtos.AdminPasswordRecoveryRequestDto
  ): Observable<AdminDtos.AdminPasswordRecoveryResponseDto> {
    return this.httpClient.post<AdminDtos.AdminPasswordRecoveryResponseDto>(
      `${this.baseUrl}/send-recovery-mail`,
      payload
    );
  }

  changePassword(
    payload: AdminDtos.AdminPasswordChangeRequestDto
  ): Observable<AdminDtos.AdminPasswordChangeResponseDto> {
    return this.httpClient.post<AdminDtos.AdminPasswordChangeResponseDto>(
      `${this.baseUrl}/change-password`,
      payload
    );
  }
}
