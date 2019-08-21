import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.auth.isAuthenticated().pipe(map(authenticated => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/login']);
        this.auth.displayMessaggeSnackBar('Login First please', 'X');
      }
    }));
  }
}


