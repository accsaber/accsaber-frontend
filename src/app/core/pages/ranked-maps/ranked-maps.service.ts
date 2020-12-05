import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RankedMap } from '../../../shared/model/ranked-map';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RankedMapsService {
  constructor(private http: HttpClient) {}

  getRankedMaps(): Observable<RankedMap[]> {
    return this.http.get<RankedMap[]>(`${environment.apiUrl}/ranked-maps`);

  }
}
