import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  checkIfUserExists(scoresaberLink: string): Observable<void> {
    if (scoresaberLink.toLowerCase().includes('scoresaber')) {
      scoresaberLink = scoresaberLink
        .replace('https://scoresaber.com/u/', '')
        .replace('http://scoresaber.com/u/', '')
        .replace('scoresaber.com/u/', '')
        .split('/')[0]
        .split('?')[0];
    }
    return this.http.get<void>(`https://new.scoresaber.com/api/player/${scoresaberLink}/full`);
  }

  signUpPlayer(scoresaberLink: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/players/`, { scoresaberLink });
  }
}
