import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, CommodityResources, EntityUidResource } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "../api";

@Injectable({
    providedIn: 'root',
})
export class CommodityVariantEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/inventory/commodity/variant`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<CommodityResources.CommodityVariantResource[]> {
        return this.httpClient.get<CommodityResources.CommodityVariantResource[]>(`${this.baseUrl}/list`);
    }

    findByUid(uid: string): Observable<CommodityResources.CommodityVariantResource> {
        return this.httpClient.get<CommodityResources.CommodityVariantResource>(`${this.baseUrl}/find/uid/${uid}`);
    }

    create(payload: AdminDtos.CreateCommodityVariantDto): Observable<EntityUidResource> {
        return this.httpClient.post<EntityUidResource>(`${this.baseUrl}/create`, payload);
    }

    update(uid: string, payload: AdminDtos.UpdateCommodityVariantDto): Observable<EntityUidResource> {
        return this.httpClient.patch<EntityUidResource>(`${this.baseUrl}/update/${uid}`, payload);
    }

    delete(uid: string): Observable<EntityUidResource> {
        return this.httpClient.delete<EntityUidResource>(`${this.baseUrl}/delete/${uid}`);
    }
}