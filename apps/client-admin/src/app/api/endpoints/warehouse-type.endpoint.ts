import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, EntityUidResource, WarehouseResources } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "./api";

@Injectable({
    providedIn: 'root',
})
export class WarehouseTypeEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/inventory/warehouse/type`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<WarehouseResources.WarehouseTypeResource[]> {
        return this.httpClient.get<WarehouseResources.WarehouseTypeResource[]>(`${this.baseUrl}/list`);
    }

    findByUid(uid: string): Observable<WarehouseResources.WarehouseTypeResource> {
        return this.httpClient.get<WarehouseResources.WarehouseTypeResource>(`${this.baseUrl}/find/uid/${uid}`);
    }

    create(payload: AdminDtos.CreateWarehouseTypeDto): Observable<EntityUidResource> {
        return this.httpClient.post<EntityUidResource>(`${this.baseUrl}/create`, payload);
    }

    update(uid: string, payload: AdminDtos.UpdateWarehouseTypeDto): Observable<EntityUidResource> {
        return this.httpClient.patch<EntityUidResource>(`${this.baseUrl}/update/${uid}`, payload);
    }

    delete(uid: string): Observable<EntityUidResource> {
        return this.httpClient.delete<EntityUidResource>(`${this.baseUrl}/delete/${uid}`);
    }
}
