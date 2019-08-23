import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

     return new Promise((resolve, request) => {
        setTimeout(() => {
          this.auth.user.subscribe(user => {
            resolve(user && user.roles.employee ? true : false);
          });
        }, 1000);
      }).then(
        isWorker => {
          console.log(isWorker);
          if (isWorker) {
            return true;
          } else {
            this.router.navigate(['/login']);
            this.auth.displayMessaggeSnackBar('Access denied - Employee only', 'X');
            return false;
          }
        }
      );


    // return this.auth.isEmployee().then(isWorker => {
    //   console.log(isWorker);
    //   if (isWorker) {
    //     return true;
    //   } else {
    //     this.router.navigate(['/login']);
    //     this.auth.displayMessaggeSnackBar('Access denied - Worker only', 'X');
    //     return false;
    //   }
    // });
  }
}
