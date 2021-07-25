import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../../shared/model/player';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Category } from '../../../shared/model/category';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  constructor(private http: HttpClient) {}

  // TODO Switch to overall leaderboard if rest endpoints are finalized
  getLeaderBoard(): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.apiUrl}/players`);
  }

  getSpecificLeaderBoard(name: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${environment.apiUrl}/categories/${name}/standings`);
  }

  getLeaderboards(): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }
}
