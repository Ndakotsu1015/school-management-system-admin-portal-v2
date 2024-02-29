import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomerOrderResource } from "libs/api-interfaces/src/lib/resources/customer";
import { Observable } from "rxjs";
import { apiBaseUrl } from "../api";

@Injectable({
  providedIn: 'root',
})
export class CustomerOrderEndpoint {
  baseUrl = `${apiBaseUrl}/api/admin/order/customer-order`;
  update: any;

  constructor(private readonly httpClient: HttpClient) { }

  list(): Observable<CustomerOrderResource[]> {
    return this.httpClient.get<CustomerOrderResource[]>(`${this.baseUrl}/list`);
  }

  findByUid(uid: string): Observable<CustomerOrderResource> {
    return this.httpClient.get<CustomerOrderResource>(`${this.baseUrl}/find/uid/${uid}`);
  }

  setAsProcessing(uid: string): Observable<CustomerOrderResource> {
    return this.httpClient.post<CustomerOrderResource>(`${this.baseUrl}/set-as-processing/${uid}`, {});
  }

  getStatisticalData(): Observable<CustomerOrderResource[]> {
    return this.httpClient.get<CustomerOrderResource[]>(`${this.baseUrl}/statistics`);
  }
}
