import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MeasuringUnitResource } from "libs/api-interfaces/src/lib/resources/commodity";
import { apiBaseUrl } from "../api";

@Injectable({
    providedIn: 'root',
})
export class MeasuringUnitEndpoint {
    baseUrl = `${apiBaseUrl}/api/common/measuring-unit`;

    constructor(private readonly httpClient: HttpClient) { }

    list() {
        return this.httpClient.get<MeasuringUnitResource[]>(`${this.baseUrl}/list`)
    }
}