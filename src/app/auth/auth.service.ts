import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
import { of, throwError, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { AuthorizationRoles } from './authorization-roles';
import * as _ from 'lodash';

interface IUserLogin {
  email: string;
  password: string;
  ship: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthorizationRoles {

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar) {
    super();

    this.user.pipe(map(user => {
      // set an array of use roles, ie ['admin', 'autor,...]
      return this.userRoles = _.keys(_.get(user, 'roles'));
    })).subscribe();

    this.afAuth.authState.pipe(
      switchMap(user => {

        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    ).subscribe(user => {
      // console.log(user);
      if (user && (user.roles.admin || user.roles.author)) {
        this.user.next(user);
      } else {
        this.user.next(null);
      }
    });
  }

  async  emailPasswordSigninUser(provider: IUserLogin) {

    // Delay the loggin process
    // await new Promise((res: any, req: any) => {
    //   setTimeout(() => res('Slow connection'), 3000);
    // }).then();

    return this.afAuth.auth.signInWithEmailAndPassword(provider.email, provider.password).
      then((credential) => {
        // Email verification
        if (credential.user.emailVerified) {
          this.updateUserData(credential.user);
          return true;
        } else {
          return false;
        }
      }).catch(
        error => {
          this.displayMessaggeSnackBar(error.message, error.code);
          return false;
        });
  }

  async updateUserData(authData) {
    const userData = new User(authData);

    const ref = this.afs.doc<User>(`users/${authData.uid}`);
    await ref.valueChanges().pipe(take(1))
      .subscribe(user => {
        if (!user.roles) {
          ref.update(Object.assign({}, userData));
        }
      });
  }

  async logOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.user.pipe(map(user => {
      if (user) {
        return true;
      } else {
         return false;
        }
    }));
  }

  displayMessaggeSnackBar(message: string, code: string) {
    this.snackBar.open(message, code, {
      duration: 3000,
    });
  }
}
