import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../shared/auth/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Login } from '../../../shared/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  private login: Login;

  ngOnInit(): void {
    this.authenticationService.loggedIn = true;

    this.route.queryParams.subscribe((params) => {
      console.log(params.code);

      this.http
        .post<Login>(`${environment.apiUrl}/login`, {
          redirectUri: 'http://localhost:4200/login',
          code: params.code,
        })
        .subscribe((loginDto) => {
          this.login = loginDto;
          console.log(this.login);
        });
    });
  }

  doCheck(): void {
    this.http
      .get<void>(`${environment.apiUrl}/login`, {
        headers: { authorization: `Bearer ${this.login.access_token}` },
      })
      .subscribe((a) => console.log(a));
  }
}
