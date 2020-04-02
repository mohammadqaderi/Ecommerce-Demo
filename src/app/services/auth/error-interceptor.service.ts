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
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden
          // response returned from api
          this.authService.userLogout();
        } else if (err.status === 404) {
          this.router.navigate(["/notFoundResource", err.status], {
            queryParams: {
              "Error-Status": err.status
            }
          });
        } else {
          this.router.navigate(["/applicationError", err.status], {
            queryParams: {
              "Error-Status": err.status
            }
          });
        }
        const error = err.message || err.statusText;
        return throwError(error);
      })
    );
  }

  constructor(private authService: AuthService, private router: Router) {
  }
}
