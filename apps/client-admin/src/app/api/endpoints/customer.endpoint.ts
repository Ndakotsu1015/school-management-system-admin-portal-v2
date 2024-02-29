import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomerResources } from "@hacienda-platform/api-interfaces";
import { Observable } from "rxjs";
import { apiBaseUrl } from "./api";

@Injectable({
    providedIn: 'root',
})
export class CustomerEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/customer`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<CustomerResources.CustomerResource[]> {
        return this.httpClient.get<CustomerResources.CustomerResource[]>(`${this.baseUrl}/list`);
    }

    findByUid(uid: string): Observable<CustomerResources.CustomerResource> {
        return this.httpClient.get<CustomerResources.CustomerResource>(`${this.baseUrl}/find/uid/${uid}`);
    }
}
