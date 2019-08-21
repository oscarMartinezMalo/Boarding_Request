import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { take, map, tap } from 'rxjs/operators';
let CanReadGuard = class CanReadGuard {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate(route, state) {
        return this.auth.user.pipe(take(1), map(user => user && this.auth.canRead ? true : false), tap(isAuthor => {
            if (!isAuthor) {
                this.router.navigate(['/login']);
                // this.auth.displayMessaggeSnackBar('Access denied - Must have permission to view content', 'X');
            }
        }));
    }
};
CanReadGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CanReadGuard);
export { CanReadGuard };
//# sourceMappingURL=can-read.guard.js.map