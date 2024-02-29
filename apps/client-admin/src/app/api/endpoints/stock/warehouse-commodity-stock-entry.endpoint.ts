import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, EntityUidResource, WarehouseResources } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "../api";

@Injectable({
    providedIn: 'root',
})
export class WarehouseCommodityStockEntryEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/inventory/warehouse/stock/entry`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<WarehouseResources.WarehouseCommodityStockEntryResource[]> {
        return this.httpClient.get<WarehouseResources.WarehouseCommodityStockEntryResource[]>(`${this.baseUrl}/list`);
    }

    findByUid(uid: string): Observable<WarehouseResources.WarehouseCommodityStockEntryResource> {
        return this.httpClient.get<WarehouseResources.WarehouseCommodityStockEntryResource>(`${this.baseUrl}/find/uid/${uid}`);
    }

    create(payload: AdminDtos.CreateWarehouseCommodityStockEntryDto): Observable<EntityUidResource> {
        return this.httpClient.post<EntityUidResource>(`${this.baseUrl}/create`, payload);
    }

    update(uid: string, payload: AdminDtos.UpdateWarehouseCommodityStockEntryDto): Observable<EntityUidResource> {
        return this.httpClient.patch<EntityUidResource>(`${this.baseUrl}/update/${uid}`, payload);
    }
}