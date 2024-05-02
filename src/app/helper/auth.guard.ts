import { Injectable } from '@angular/core';
import { CanActivate, Router, type ActivatedRouteSnapshot, type NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isAuthenticated = false;
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const queryObj = {redirectUrl: route.url};
    const navigation: NavigationExtras = {
      queryParams: queryObj,
    };

    if (this.isAuthenticated) {
      this.router.navigate(['login'], navigation);
      return false;
    }
    
    return true;

  }
}