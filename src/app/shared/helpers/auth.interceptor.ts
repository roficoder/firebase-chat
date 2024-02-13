import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private storageService: StorageService,
    private _alertService: AlertService,
  ) {}

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request object
    let newReq = req.clone();
    newReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + this._authService.accessToken
      ),
    });
    this.storageService.setAutoLogout();
    // Response
    return next.handle(newReq).pipe(
      catchError((error) => {
        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Log out
          // this._authService.logout({ deviceId: this._authService.deviceId });

          // Reload the app
          // location.reload();
          this._alertService.show_alert(
            this.translate.getTranslation('check-your-internet'),
            '',
            'error'
          );
        } else if (
          error instanceof HttpErrorResponse &&
          (error.status === 500 || error.status === 400)
        ) {
          // display errors
          if (!error.url?.includes('technicalSupport')) {
            this._alertService.showValidationErrors(error.error?.message);
          }
        }

        // if any other error return it to calling api
        return throwError(() => new Error(error));
      })
    );
  }
}
