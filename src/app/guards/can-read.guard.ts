import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanReadGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.auth.user.pipe(
      take(1),
      map(user => user && this.auth.canRead ? true : false),
      tap(isAuthor => {
        if (!isAuthor) {
          this.router.navigate(['/login']);
          // this.auth.displayMessaggeSnackBar('Access denied - Must have permission to view content', 'X');
        }
      })
    );
  }
}
