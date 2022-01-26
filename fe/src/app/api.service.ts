import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

import ApiResponse from './api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    baseUrl = `${environment.baseUrl}/api`;

    constructor(private httpClient: HttpClient) { }

    joinRoom(roomKey: string, username: string): Observable<ApiResponse> {
        console.log(roomKey, username)
        return this.httpClient.post<ApiResponse>(
            `${this.baseUrl}/rooms`,
            {
                username: username,
                roomKey: roomKey,
            });
    }
}
