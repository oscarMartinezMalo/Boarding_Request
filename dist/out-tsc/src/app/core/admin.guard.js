import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { take, map, tap } from 'rxjs/operators';
let AdminGuard = class AdminGuard {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate(route, state) {
        return this.auth.user.pipe(take(1), map(user => user && user.roles.admin ? true : false), tap(isAdmin => {
            if (!isAdmin) {
                this.router.navigate(['/login']);
                // this.auth.displayMessaggeSnackBar('Access denied - Admin only', 'X');
            }
        }));
    }
};
AdminGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AdminGuard);
export { AdminGuard };
//# sourceMappingURL=admin.guard.js.map