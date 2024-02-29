import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, EntityUidResource, LogisticsResources } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "../api";

@Injectable({
  providedIn: 'root',
})
export class LogisticsProviderContactEndpoint {
  baseUrl = `${apiBaseUrl}/api/admin/logistics/provider/contact`;

  constructor(private readonly httpClient: HttpClient) { }

  list(): Observable<LogisticsResources.LogisticsProviderContactResource[]> {
    return this.httpClient.get<LogisticsResources.LogisticsProviderContactResource[]>(`${this.baseUrl}/list`);
  }

  findByUid(uid: string): Observable<LogisticsResources.LogisticsProviderContactResource> {
    return this.httpClient.get<LogisticsResources.LogisticsProviderContactResource>(`${this.baseUrl}/find/uid/${uid}`);
  }

  create(payload: AdminDtos.CreateLogisticsProviderContactDto): Observable<LogisticsResources.LogisticsProviderContactResource> {
    return this.httpClient.post<LogisticsResources.LogisticsProviderContactResource>(`${this.baseUrl}/create`, payload);
  }

  update(uid: string, payload: AdminDtos.CreateLogisticsProviderContactDto): Observable<EntityUidResource> {
    return this.httpClient.patch<LogisticsResources.LogisticsProviderContactResource>(`${this.baseUrl}/update/${uid}`, payload);
  }

  delete(uid: string): Observable<EntityUidResource> {
    return this.httpClient.delete<EntityUidResource>(`${this.baseUrl}/delete/${uid}`);
  }
}
