import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { take, map, tap } from 'rxjs/operators';
let AuthorGuard = class AuthorGuard {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate(route, state) {
        const response = this.auth.user.pipe(take(1), map(user => {
            return user && user.roles.author ? true : false;
        }), tap(isAuthor => {
            if (!isAuthor) {
                console.error('Access denied - isAuthor only');
                this.auth.displayMessaggeSnackBar('Access denied - isAuthor only', 'X');
                return false;
            }
            else {
                return true;
            }
        }));
        console.log(response);
        return response;
    }
};
AuthorGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthorGuard);
export { AuthorGuard };
//# sourceMappingURL=author.guard.js.map