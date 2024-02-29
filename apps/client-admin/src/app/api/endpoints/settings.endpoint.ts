/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { apiBaseUrl } from "./api";
import { DeliverysettingsResource } from "libs/api-interfaces/src/lib/resources/delivery-settings";
import { UpdateDeliverySettingsDto } from "libs/api-interfaces/src/lib/dtos/admin";
import { EntityUidResource } from "@hacienda-platform/api-interfaces";

@Injectable({
  providedIn: 'root',
})
export class DeliverySettingsEndpoint {
  baseUrl = `${apiBaseUrl}/api/admin/settings`;

  constructor(private readonly httpClient: HttpClient) { }

  getDeliveryCharges(): Observable<DeliverysettingsResource> {
    return this.httpClient.get<DeliverysettingsResource>(`${this.baseUrl}/delivery-charges`);
  }

  updateOrCreate(payload: UpdateDeliverySettingsDto): Observable<EntityUidResource> {
    return this.httpClient.post<EntityUidResource>(`${this.baseUrl}/update-delivery-charges`, payload);
  }
}
