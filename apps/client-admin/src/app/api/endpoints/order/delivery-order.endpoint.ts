import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryOrderResource } from 'libs/api-interfaces/src/lib/resources/customer';
import { Observable } from 'rxjs';
import { apiBaseUrl } from '../api';
import { EntityUidResource } from '@hacienda-platform/api-interfaces';
import {
  CreateDeliveryOrderDto,
  E_DeliveryOrderStatus,
  UpdateDeliveryOrderDto,
  logisticsProviderUpdateDto
} from 'libs/api-interfaces/src/lib/dtos/commerce';

@Injectable({
  providedIn: 'root'
})
export class DeliveryOrderEndpoint {
  baseUrl = `${apiBaseUrl}/api/admin/order/delivery-order`;

  constructor(private readonly httpClient: HttpClient) {}

  list(): Observable<DeliveryOrderResource[]> {
    return this.httpClient.get<DeliveryOrderResource[]>(
      `${this.baseUrl}/list`
    );
  }

  findByUid(
    uid: string
  ): Observable<DeliveryOrderResource> {
    return this.httpClient.get<DeliveryOrderResource>(
      `${this.baseUrl}/find/uid/${uid}`
    );
  }

  create(
    payload: CreateDeliveryOrderDto
  ): Observable<EntityUidResource> {
    return this.httpClient.post<EntityUidResource>(
      `${this.baseUrl}/create`,
      payload
    );
  }

  update(
    uid: string,
    payload: UpdateDeliveryOrderDto
  ): Observable<EntityUidResource> {
    return this.httpClient.patch<EntityUidResource>(
      `${this.baseUrl}/update/${uid}`,
      payload
    );
  }

  approve(uid: string, status: E_DeliveryOrderStatus) {
    return this.httpClient.post<any>(
      `${this.baseUrl}/change-status`,
      { uid, status }
    );
  }

  assignLogisticsProvider(delivery_order_uid: string, logistics_provider_uid: string): Observable<any> {
    console.log(delivery_order_uid, logistics_provider_uid);

    return this.httpClient.post<any>(
      `${this.baseUrl}/assign-logistics-provider`,
      { delivery_order_uid, logistics_provider_uid }
    );
  }
}
