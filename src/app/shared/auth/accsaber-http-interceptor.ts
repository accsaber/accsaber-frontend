import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { clearToken, getToken } from '../utlis/global-utils';
import { showError } from '../utlis/snackbar-utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccsaberHttpInterceptor implements HttpInterceptor {
  errorMap = {
    '00001': 'The linked Scoresaber account is already signed up.',
    '00002': 'The provided map is already ranked.',
    '00100': 'The requested player could not be found',
  };

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = getToken();
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('Authorization', token);
    }
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          showError(this.snackBar, this.errorMap[err.error.errorCode]);
        }
        if (err.status === 401 || err.status === 403) {
          showError(this.snackBar, 'Authentication error, request did not succeed');
          clearToken();
          this.router.navigateByUrl('');
        }
        return throwError(err);
      })
    );
  }
}
