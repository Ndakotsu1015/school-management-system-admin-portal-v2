import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, EntityUidResource, WarehouseResources } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "./api";

@Injectable({
    providedIn: 'root',
})
export class WarehouseEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/inventory/warehouse`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<WarehouseResources.WarehouseResource[]> {
        return this.httpClient.get<WarehouseResources.WarehouseResource[]>(`${this.baseUrl}/list`);
    }

    findByUid(uid: string): Observable<WarehouseResources.WarehouseResource> {
        return this.httpClient.get<WarehouseResources.WarehouseResource>(`${this.baseUrl}/find/uid/${uid}`);
    }

    create(payload: AdminDtos.CreateWarehouseDto): Observable<EntityUidResource> {
        return this.httpClient.post<EntityUidResource>(`${this.baseUrl}/create`, payload);
    }

    update(uid: string, payload: AdminDtos.UpdateWarehouseDto): Observable<EntityUidResource> {
        return this.httpClient.patch<EntityUidResource>(`${this.baseUrl}/update/${uid}`, payload);
    }

    delete(uid: string): Observable<EntityUidResource> {
        return this.httpClient.delete<EntityUidResource>(`${this.baseUrl}/delete/${uid}`);
    }
}