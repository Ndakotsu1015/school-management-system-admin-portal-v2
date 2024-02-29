import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, EntityUidResource, WarehouseResources } from "@hacienda-platform/api-interfaces";
import { WarehouseCommodityStockEntryResource } from "libs/api-interfaces/src/lib/resources/warehouse";
import { Observable } from "rxjs";
import { apiBaseUrl } from "../api";

@Injectable({
  providedIn: 'root',
})
export class WarehouseCommodityStockEndpoint {
  baseUrl = `${apiBaseUrl}/api/admin/inventory/warehouse/stock`;

  constructor(private readonly httpClient: HttpClient) { }

  list(): Observable<WarehouseResources.WarehouseCommodityStockResource[]> {
    return this.httpClient.get<WarehouseResources.WarehouseCommodityStockResource[]>(`${this.baseUrl}/list`);
  }

  findByUid(uid: string): Observable<WarehouseResources.WarehouseCommodityStockResource> {
    return this.httpClient.get<WarehouseResources.WarehouseCommodityStockResource>(`${this.baseUrl}/find/uid/${uid}`);
  }

  findVariantByUid(uid: string): Observable<WarehouseResources.WarehouseCommodityStockResource[]> {
    return this.httpClient.get<WarehouseResources.WarehouseCommodityStockResource[]>(`${this.baseUrl}/find/variant/uid/${uid}`);
  }

  create(payload: AdminDtos.CreateWarehouseCommodityStockDto): Observable<EntityUidResource> {
    return this.httpClient.post<EntityUidResource>(`${this.baseUrl}/create`, payload);
  }

  update(uid: string, payload: AdminDtos.UpdateWarehouseCommodityStockDto): Observable<EntityUidResource> {
    return this.httpClient.patch<EntityUidResource>(`${this.baseUrl}/update/${uid}`, payload);
  }

  delete(uid: string): Observable<EntityUidResource> {
    return this.httpClient.delete<EntityUidResource>(`${this.baseUrl}/delete/${uid}`);
  }

  fetchStockEntries(uid: string) {
    return this.httpClient.get<WarehouseCommodityStockEntryResource>(`${this.baseUrl}/relation/${uid}/entries`);
  }
}
