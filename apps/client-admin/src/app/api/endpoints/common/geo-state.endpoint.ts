import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GeoStateResource } from "libs/api-interfaces/src/lib/resources/geo";
import { apiBaseUrl } from "../api";

@Injectable({
  providedIn: 'root',
})
export class GeoStateEndpoint {
  baseUrl = `${apiBaseUrl}/api/common/geo/state`;

  constructor(private readonly httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<GeoStateResource[]>(`${this.baseUrl}/list`);
  }

  findById(id: number) {
    return this.httpClient.get<GeoStateResource>(`${this.baseUrl}/find/${id}`);
  }

}
