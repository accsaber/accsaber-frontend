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

@Injectable({
  providedIn: 'root',
})
export class AccsaberHttpInterceptor implements HttpInterceptor {
  errorMap = {
    '00001': 'The linked Scoresaber account is already signed up.',
    '00002': 'The provided map is already ranked.',
    '00100': 'The requested player could not be found',
  };

  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.snackBar.open(this.errorMap[err.error.errorCode], null, { panelClass: 'error' });
        }
        return throwError(err);
      })
    );
  }
}
