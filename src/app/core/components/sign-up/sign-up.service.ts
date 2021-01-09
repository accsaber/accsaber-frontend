import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ScoreSaberPlayerData } from '../../../shared/model/scoresaber/score-saber-player-data';
import { ScoreSaberPlayerInfo } from '../../../shared/model/scoresaber/score-saber-player-info';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  checkIfUserExists(scoresaberLink: string): Observable<ScoreSaberPlayerData> {
    if (scoresaberLink.toLowerCase().includes('scoresaber')) {
      scoresaberLink = scoresaberLink
        .replace('https://scoresaber.com/u/', '')
        .replace('http://scoresaber.com/u/', '')
        .replace('scoresaber.com/u/', '')
        .split('/')[0]
        .split('?')[0];
    }
    return this.http.get<ScoreSaberPlayerData>(
      `https://new.scoresaber.com/api/player/${scoresaberLink}/full`
    );
  }

  signUpPlayer(playerInfo: ScoreSaberPlayerInfo, hmd: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/players/`, {
      scoresaberLink: playerInfo.playerId,
      playerName: playerInfo.playerName,
      hmd,
    });
  }
}
