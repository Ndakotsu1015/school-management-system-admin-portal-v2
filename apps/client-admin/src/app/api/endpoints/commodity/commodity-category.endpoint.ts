import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AdminDtos,
  CommodityResources,
  EntityUidResource
} from '@hacienda-platform/api-interfaces';
import { Observable } from 'rxjs';
import { apiBaseUrl } from '../api';

@Injectable({
  providedIn: 'root'
})
export class CommodityCategoryEndpoint {
  baseUrl = `${apiBaseUrl}/api/admin/inventory/commodity/category`;

  constructor(private readonly httpClient: HttpClient) { }

  list(): Observable<
    CommodityResources.CommodityCategoryResource[]
  > {
    return this.httpClient.get<
      CommodityResources.CommodityCategoryResource[]
    >(`${this.baseUrl}/list`);
  }

  findByUid(
    uid: string
  ): Observable<CommodityResources.CommodityCategoryResource> {
    return this.httpClient.get<CommodityResources.CommodityCategoryResource>(
      `${this.baseUrl}/find/uid/${uid}`
    );
  }

  create(
    payload: AdminDtos.CreateCommodityCategoryDto
  ): Observable<EntityUidResource> {
    return this.httpClient.post<EntityUidResource>(
      `${this.baseUrl}/create`,
      payload
    );
  }

  update(
    uid: string,
    payload: AdminDtos.UpdateCommodityCategoryDto
  ): Observable<EntityUidResource> {
    return this.httpClient.patch<EntityUidResource>(
      `${this.baseUrl}/update/${uid}`,
      payload
    );
  }

  delete(uid: string): Observable<EntityUidResource> {
    return this.httpClient.delete<EntityUidResource>(
      `${this.baseUrl}/delete/${uid}`
    );
  }
}
