import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, EntityUidResource, WarehouseResources } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "./api";

@Injectable({
    providedIn: 'root',
})
export class WarehouseOwnerEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/inventory/warehouse/owner`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<WarehouseResources.WarehouseOwnerResource[]> {
        return this.httpClient.get<WarehouseResources.WarehouseOwnerResource[]>(`${this.baseUrl}/list`);
    }

    findByUid(uid: string): Observable<WarehouseResources.WarehouseOwnerResource> {
        return this.httpClient.get<WarehouseResources.WarehouseOwnerResource>(`${this.baseUrl}/find/uid/${uid}`);
    }

    create(payload: AdminDtos.CreateWarehouseOwnerDto): Observable<EntityUidResource> {
        return this.httpClient.post<EntityUidResource>(`${this.baseUrl}/create`, payload);
    }

    update(uid: string, payload: AdminDtos.UpdateWarehouseOwnerDto): Observable<EntityUidResource> {
        return this.httpClient.patch<EntityUidResource>(`${this.baseUrl}/update/${uid}`, payload);
    }

    delete(uid: string): Observable<EntityUidResource> {
        return this.httpClient.delete<EntityUidResource>(`${this.baseUrl}/delete/${uid}`);
    }
}
