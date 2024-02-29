import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ChartsResources } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "./api";

@Injectable({
    providedIn: 'root',
})
export class DasbhoardEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/charts/dashboardsetting`;

    constructor(private readonly httpClient: HttpClient) { }

    get(id: number): Observable<ChartsResources.DashboardSettingResource[]> {
        return this.httpClient.get<ChartsResources.DashboardSettingResource[]>(`${this.baseUrl}/module/uid/${id}`);
    }
}