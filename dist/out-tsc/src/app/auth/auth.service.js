import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from './user';
import { BehaviorSubject } from 'rxjs';
import { AuthorizationRoles } from './authorization-roles';
import * as _ from 'lodash';
let AuthService = class AuthService extends AuthorizationRoles {
    constructor(afAuth, afs, router, snackBar) {
        super();
        this.afAuth = afAuth;
        this.afs = afs;
        this.router = router;
        this.snackBar = snackBar;
        this.user = new BehaviorSubject(null);
        this.user.pipe(map(user => {
            // set an array of use roles, ie ['admin', 'autor,...]
            return this.userRoles = _.keys(_.get(user, 'roles'));
        })).subscribe();
        this.afAuth.authState.pipe(switchMap(user => {
            if (user) {
                return this.afs.doc(`users/${user.uid}`).valueChanges();
            }
            else {
                return of(null);
            }
        })).subscribe(user => {
            // console.log(user);
            if (user && (user.roles.admin || user.roles.author)) {
                this.user.next(user);
            }
            else {
                this.user.next(null);
            }
        });
    }
    emailPasswordSigninUser(provider) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                }
                else {
                    return false;
                }
            }).catch(error => {
                this.displayMessaggeSnackBar(error.message, error.code);
                return false;
            });
        });
    }
    updateUserData(authData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userData = new User(authData);
            const ref = this.afs.doc(`users/${authData.uid}`);
            yield ref.valueChanges().pipe(take(1))
                .subscribe(user => {
                if (!user.roles) {
                    ref.update(Object.assign({}, userData));
                }
            });
        });
    }
    logOut() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.afAuth.auth.signOut();
            this.router.navigate(['/login']);
        });
    }
    isAuthenticated() {
        return !!this.user.value;
    }
    displayMessaggeSnackBar(message, code) {
        this.snackBar.open(message, code, {
            duration: 3000,
        });
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map