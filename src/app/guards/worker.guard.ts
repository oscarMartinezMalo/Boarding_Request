import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkerGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.auth.isWorker().then(isWorker => {
      console.log(isWorker);
      if (isWorker) {
        return true;
      } else {
        this.router.navigate(['/login']);
        this.auth.displayMessaggeSnackBar('Access denied - Worker only', 'X');
        return false;
      }
    });

    // if (this.auth.isWorker()) {
    //   return true;
    // } else {
    //   return false;
    // }
    //  return this.auth.user.pipe(
    //     take(1),
    //     map(user => user.roles.worker),
    //     tap(isWorker => {
    //       if (!isWorker) {
    //         this.router.navigate(['/login']);
    //         this.auth.displayMessaggeSnackBar('Access denied - Worker only', 'X');
    //       }
    //     })
    //   );
  }
}
