import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanReadGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.auth.user.pipe(
      take(1),
      map(user => user && this.auth.canRead ? true : false),
      tap(isAuthor => {
        if (!isAuthor) {
          console.error('Access denied - Must have permission to view content');
        }
      })
    );
  }
}
