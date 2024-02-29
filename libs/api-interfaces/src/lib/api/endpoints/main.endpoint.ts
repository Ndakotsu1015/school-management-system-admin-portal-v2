import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../../api-interfaces';

@Injectable({
    providedIn: 'root',
})
export class MainEndpoint {
    constructor(private readonly http: HttpClient) { }

    getHello() {
        return this.http.get<Message>('/api/hello');
    }
}