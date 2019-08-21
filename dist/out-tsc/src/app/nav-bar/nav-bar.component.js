import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
let NavBarComponent = class NavBarComponent {
    constructor(breakpointObserver, auth) {
        this.breakpointObserver = breakpointObserver;
        this.auth = auth;
        this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
            .pipe(map(result => result.matches));
    }
    onLogout() {
        this.auth.logOut();
    }
};
NavBarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-nav-bar',
        templateUrl: './nav-bar.component.html',
        styleUrls: ['./nav-bar.component.scss']
    })
], NavBarComponent);
export { NavBarComponent };
//# sourceMappingURL=nav-bar.component.js.map