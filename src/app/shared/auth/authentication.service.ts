import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loginUrl =
    'https://discord.com/api/oauth2/authorize' +
    '?client_id=832874499157786675' +
    '&redirect_uri=http://localhost:4200/login' +
    '&response_type=code' +
    '&scope=identify' +
    '&state=arf';

  loggedIn = false;

  constructor(private http: HttpClient) {}

  attemptLogin(): void {
    window.location.href = this.loginUrl;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logOut(): void {}
}
