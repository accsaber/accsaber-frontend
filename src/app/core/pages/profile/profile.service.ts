import { Injectable } from '@angular/core';
import { Player } from '../../../shared/model/player';
import { Observable } from 'rxjs';
import { PlayerScore } from '../../../shared/model/player-score';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getPlayerRankedScores(playerId: string): Observable<PlayerScore[]> {
    return this.http.get<PlayerScore[]>(`${environment.apiUrl}/players/${playerId}/scores`);
  }

  getPlayerInfo(playerId: string): Observable<Player> {
    return this.http.get<Player>(`${environment.apiUrl}/players/${playerId}`);
  }
}
