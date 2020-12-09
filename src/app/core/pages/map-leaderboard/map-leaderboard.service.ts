import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MapLeaderboardPlayer } from '../../../shared/model/map-leaderboard-player';
import { RankedMap } from '../../../shared/model/ranked-map';

@Injectable({
  providedIn: 'root',
})
export class MapLeaderboardService {
  constructor(private http: HttpClient) {}

  getMapLeaderboard(leaderboardId: string): Observable<MapLeaderboardPlayer[]> {
    return this.http.get<MapLeaderboardPlayer[]>(
      `${environment.apiUrl}/map-leaderboards/${leaderboardId}`
    );
  }

  getMapData(leaderboardId: string): Observable<RankedMap> {
    return this.http.get<RankedMap>(`${environment.apiUrl}/ranked-maps/${leaderboardId}`);
  }
}
