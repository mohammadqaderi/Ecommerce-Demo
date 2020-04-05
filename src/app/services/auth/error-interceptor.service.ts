import {Injectable} from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

// this interceptor service need custom injection

@Injectable({
  providedIn: "root"
})
export class ErrorInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let error = null;
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden
          // response returned from api
          this.openSnackBar('Login Session has expired!', 'OK');
          this.authService.userLogout();
        } else if (err.status === 404) {
          this.router.navigate(["/notFoundResource", err.status], {
            queryParams: {
              "Error-Status": err.status
            }
          });
          error = err.message || err.statusText;
          return throwError(error);
        } else if (err.status === 500 || err.status === 400) {
          this.router.navigate(["/applicationError", err.status], {
            queryParams: {
              "Error-Status": err.status
            }
          });
          error = err.message || err.statusText;
          return throwError(error);
        }

      })
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  constructor(private authService: AuthService,
              private router: Router, private snackBar: MatSnackBar) {
  }
}
