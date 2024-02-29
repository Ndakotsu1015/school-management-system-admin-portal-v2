import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, AdminUserResources, EntityUidResource } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "../api";

@Injectable({
    providedIn: 'root',
})
export class UserGroupEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/user/groups`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<AdminUserResources.AdminUserGroupResource[]> {
        return this.httpClient.get<AdminUserResources.AdminUserGroupResource[]>(`${this.baseUrl}/list`);
    }

    findByUid(uid: string): Observable<AdminUserResources.AdminUserGroupResource> {
        return this.httpClient.get<AdminUserResources.AdminUserGroupResource>(`${this.baseUrl}/find/uid/${uid}`);
    }

    create(payload: AdminDtos.CreateAdminUserGroupDto): Observable<EntityUidResource> {
        return this.httpClient.post<EntityUidResource>(`${this.baseUrl}/create`, payload);
    }

    update(uid: string, payload: AdminDtos.UpdateAdminUserGroupDto): Observable<EntityUidResource> {
        return this.httpClient.patch<EntityUidResource>(`${this.baseUrl}/update/${uid}`, payload);
    }

    delete(uid: string): Observable<EntityUidResource> {
        return this.httpClient.delete<EntityUidResource>(`${this.baseUrl}/delete/${uid}`);
    }
}