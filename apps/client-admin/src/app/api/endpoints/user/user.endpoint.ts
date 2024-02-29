import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, AdminUserResources, EntityUidResource } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "../api";

@Injectable({
    providedIn: 'root',
})
export class UserEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/user/users`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<AdminUserResources.AdminUserResource[]> {
        return this.httpClient.get<AdminUserResources.AdminUserResource[]>(`${this.baseUrl}/list`);
    }

    findByUid(uid: string): Observable<AdminUserResources.AdminUserResource> {
        return this.httpClient.get<AdminUserResources.AdminUserResource>(`${this.baseUrl}/find/uid/${uid}`);
    }

    create(payload: AdminDtos.CreateAdminUserDto): Observable<EntityUidResource> {
        return this.httpClient.post<EntityUidResource>(`${this.baseUrl}/create`, payload);
    }

    updateInfo(uid: string, payload: AdminDtos.UpdateAdminUserInfoDto): Observable<EntityUidResource> {
        return this.httpClient.patch<EntityUidResource>(`${this.baseUrl}/update/info/${uid}`, payload);
    }

    updateActivationStatus(uid: string, payload: AdminDtos.UpdateAdminUserActivationStatusDto): Observable<EntityUidResource> {
        return this.httpClient.patch<EntityUidResource>(`${this.baseUrl}/update/activation-status/${uid}`, payload);
    }

    delete(uid: string): Observable<EntityUidResource> {
        return this.httpClient.delete<EntityUidResource>(`${this.baseUrl}/delete/${uid}`);
    }
}