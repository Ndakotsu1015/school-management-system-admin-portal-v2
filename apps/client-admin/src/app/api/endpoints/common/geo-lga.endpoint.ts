import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GeoLgaResource } from "libs/api-interfaces/src/lib/resources/geo";
import { apiBaseUrl } from "../api";

@Injectable({
    providedIn: 'root',
})
export class GeoLgaEndpoint {
    baseUrl = `${apiBaseUrl}/api/common/geo/lga`;

    constructor(private readonly httpClient: HttpClient) { }

    list() {
        return this.httpClient.get<GeoLgaResource[]>(`${this.baseUrl}/list`)
    }

    findById(id: number) {
        return this.httpClient.get<GeoLgaResource>(`${this.baseUrl}/find/${id}`)
    }
}