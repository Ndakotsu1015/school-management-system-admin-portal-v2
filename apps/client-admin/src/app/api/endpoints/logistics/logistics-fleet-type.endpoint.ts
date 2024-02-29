import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AdminDtos, EntityUidResource, LogisticsResources } from "@hacienda-platform/api-interfaces";
import { LogisticsFleetTypeResource } from "libs/api-interfaces/src/lib/resources/logistics";
import { Observable } from "rxjs";
import { apiBaseUrl } from "../api";

@Injectable({
    providedIn: 'root',
})
export class LogisticsFleetTypeEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/logistics/fleet/type`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<LogisticsResources.LogisticsFleetTypeResource[]> {
        return this.httpClient.get<LogisticsResources.LogisticsFleetTypeResource[]>(`${this.baseUrl}/list`);
    }

    findByUid(uid: string): Observable<LogisticsResources.LogisticsFleetTypeResource> {
        return this.httpClient.get<LogisticsResources.LogisticsFleetTypeResource>(`${this.baseUrl}/find/uid/${uid}`);
    }

    create(payload: AdminDtos.UpdateLogisticsFleetTypeDto): Observable<LogisticsFleetTypeResource> {
        return this.httpClient.post<LogisticsFleetTypeResource>(`${this.baseUrl}/create`, payload);
    }

    update(uid: string, payload: AdminDtos.UpdateLogisticsFleetTypeDto): Observable<EntityUidResource> {
        return this.httpClient.patch<LogisticsFleetTypeResource>(`${this.baseUrl}/update/${uid}`, payload);
    }

    delete(uid: string): Observable<EntityUidResource> {
        return this.httpClient.delete<EntityUidResource>(`${this.baseUrl}/delete/${uid}`);
    }
}
