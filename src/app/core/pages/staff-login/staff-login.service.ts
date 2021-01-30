import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StaffLoginService {
  constructor(private http: HttpClient) {}

  attemptLogin(username: string, password: string): Observable<string> {
    return this.http.post(
      `${environment.apiUrl}/staff/login`,
      { username, password },
      { responseType: 'text' }
    );
  }
}
