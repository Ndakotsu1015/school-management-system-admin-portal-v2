import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, EntityUidResource, HrResources } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "./api";

@Injectable({
    providedIn: 'root',
})
export class HrStaffEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/hr/staff`;
    add: any;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<HrResources.HrStaffResource[]> {
        return this.httpClient.get<HrResources.HrStaffResource[]>(`${this.baseUrl}/list`);
    }

    findByUid(uid: string): Observable<HrResources.HrStaffResource> {
        return this.httpClient.get<HrResources.HrStaffResource>(`${this.baseUrl}/find/uid/${uid}`);
    }

    create(payload: AdminDtos.CreateHrStaffDto): Observable<EntityUidResource> {
        return this.httpClient.post<EntityUidResource>(`${this.baseUrl}/create`, payload);
    }

    update(uid: string, payload: AdminDtos.UpdateHrStaffDto): Observable<EntityUidResource> {
        return this.httpClient.patch<EntityUidResource>(`${this.baseUrl}/update/${uid}`, payload);
    }

    delete(uid: string): Observable<EntityUidResource> {
        return this.httpClient.delete<EntityUidResource>(`${this.baseUrl}/delete/${uid}`);
    }
}