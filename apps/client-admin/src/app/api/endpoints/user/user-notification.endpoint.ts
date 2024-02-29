import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiBaseUrl } from "../api";
import { UserNotificationResponseDto } from "libs/api-interfaces/src/lib/dtos/admin";

@Injectable({
    providedIn: 'root',
})
export class UserNotificationEndpoint {
    baseUrl = `${apiBaseUrl}/api/admin/user-notification`;

    constructor(private readonly httpClient: HttpClient) { }

    list() {
        return this.httpClient.get<UserNotificationResponseDto[]>(`${this.baseUrl}/list`)
    }
}
