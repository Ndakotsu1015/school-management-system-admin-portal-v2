import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, EntityUidResource, LogisticsResources } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "../api";

@Injectable({
  providedIn: 'root',
})
export class LogisticsProviderEndpoint {
  baseUrl = `${apiBaseUrl}/api/admin/logistics/provider`;

  constructor(private readonly httpClient: HttpClient) { }

  list(): Observable<LogisticsResources.LogisticsProviderResource[]> {
    return this.httpClient.get<LogisticsResources.LogisticsProviderResource[]>(`${this.baseUrl}/list`);
  }

  findByUid(uid: string): Observable<LogisticsResources.LogisticsProviderResource> {
    return this.httpClient.get<LogisticsResources.LogisticsProviderResource>(`${this.baseUrl}/find/uid/${uid}`);
  }

  create(payload: AdminDtos.CreateLogisticsProviderDto): Observable<LogisticsResources.LogisticsProviderResource> {
    return this.httpClient.post<LogisticsResources.LogisticsProviderResource>(`${this.baseUrl}/create`, payload);
  }

  update(uid: string, payload: AdminDtos.CreateLogisticsProviderDto): Observable<EntityUidResource> {
    return this.httpClient.patch<LogisticsResources.LogisticsProviderResource>(`${this.baseUrl}/update/${uid}`, payload);
  }

  delete(uid: string): Observable<EntityUidResource> {
    return this.httpClient.delete<EntityUidResource>(`${this.baseUrl}/delete/${uid}`);
  }
}
