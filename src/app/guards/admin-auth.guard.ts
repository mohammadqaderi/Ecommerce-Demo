import {Injectable} from '@angular/core';
import {

  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate, Router
} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.authService.currentUser && this.authService.currentUser.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/auth/login'], {
        queryParams: {returnUrl: state.url}
      });
      return false;
    }
  }
}
