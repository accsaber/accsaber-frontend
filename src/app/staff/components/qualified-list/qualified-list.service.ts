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
      downvotes: 0
    }]);
  }
}
