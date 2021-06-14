import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RankSongDto } from '../../shared/model/rank-song-dto';
import { environment } from '../../../environments/environment';
import { RankedStatistics } from '../../shared/model/ranked-statistics';

@Injectable({
  providedIn: 'root',
})
export class RankSongService {
  constructor(private http: HttpClient) {}

  rankSong(rankSongInfo: RankSongDto): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/ranked-maps`, rankSongInfo);
  }

  getRankedStatistic(): Observable<RankedStatistics> {
    return this.http.get<RankedStatistics>(`${environment.apiUrl}/ranked-maps/statistics`);
  }
}
