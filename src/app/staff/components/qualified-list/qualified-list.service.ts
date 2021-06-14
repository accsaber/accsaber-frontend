import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { QualifiedMap } from '../../../shared/model/qualified-map';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QualifiedListService {
  constructor(private http: HttpClient) {}

  getQualifiedMaps(): Observable<QualifiedMap[]> {
    // return this.http.get<QualifiedMap[]>(`${environment.apiUrl}/qualified-maps`);
    // TODO remove hardcoded data and replace by api call above
    return of([{
      songName: 'Quiet Water',
      songSubName: '',
      songAuthorName: 'Toby Fox',
      levelAuthorName: 'Whiisper',
      techynessSuggestions: [],
      difficulty: 'Easy',
      leaderboardId: '197416',
      beatsaverKey: '7e8f',
      songHash: '4963752D07B806F9B0028D0015DC7E65BB74A1C8',
      upvotes: 0,
      downvotes: 0,
      userVote: 0
    }, {
      songName: 'Gas Mask',
      songSubName: '',
      songAuthorName: 'Generdyn',
      levelAuthorName: 'Rustic',
      techynessSuggestions: [],
      difficulty: 'Normal',
      leaderboardId: '33107',
      beatsaverKey: '7a6',
      songHash: '8B53010B2F6656C5BE03C110724703763CC3CB03',
      upvotes: 0,
      downvotes: 1,
      userVote: -1
    }]);
  }

  upvoteMap(key: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/qualified-maps/upvote`, {
      mapKey: key
    });
  }

  downvoteMap(key: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/qualified-maps/downvote`, {
      mapKey: key
    });
  }
}
