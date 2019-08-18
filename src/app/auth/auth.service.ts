import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';

import { User } from './user';
import { BehaviorSubject } from 'rxjs';

interface IUserLogin {
  email: string;
  password: string;
  ship: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar) {

    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    ).subscribe(user => {
      this.user.next(user);
    });
  }

  async emailPasswordSigninUser(provider: IUserLogin) {
    // Delay the loggin process
    await new Promise((res: any, req: any) => {
      setTimeout(() => res('Slow connection'), 3000);
    }).then(resp => console.log(resp));

    let successLogin = false;

    successLogin = await this.afAuth.auth.signInWithEmailAndPassword(provider.email, provider.password).
      then((credential) => {
        // Email verification
        if (credential.user.emailVerified) {
          this.updateUserData(credential.user);
          this.router.navigate(['/request']);
          return true;
        }
      }).catch(
        error => {
          this.displayMessaggeSnackBar(error.message, error.code);
          return false;
        });

    return successLogin;
  }

  updateUserData(authData): void {
    const userData = new User(authData);

    const ref = this.afs.doc<User>(`users/${authData.uid}`);
    ref.valueChanges().pipe(take(1))
      .subscribe(user => {
        if (!user.roles) {
          ref.update(Object.assign({}, userData));
        }
      });
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.displayMessaggeSnackBar(error.message, error.code);
    });
  }

  displayMessaggeSnackBar(message: string, code: string) {
    this.snackBar.open(message, code, {
      duration: 3000,
    });
  }
}
