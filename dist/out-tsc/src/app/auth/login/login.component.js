import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as ShipTypes from './shipTypes.service';
import { SpinnerPopComponent } from '../../spinner-pop/spinner-pop.component';
let LoginComponent = class LoginComponent {
    constructor(fb, loginService, dialog, authService, router) {
        this.fb = fb;
        this.loginService = loginService;
        this.dialog = dialog;
        this.authService = authService;
        this.router = router;
        this.hide = true;
        this.urlLogo = '';
        this.IMAGES_URL = './../../../assets/images/logos/black/';
        this.loginForm = this.fb.group({
            email: [null, [
                    Validators.required,
                    Validators.email,
                    this.emailValid()
                ]],
            password: [null, [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(25)
                ]],
            ship: [null, [
                    Validators.required
                ]]
        });
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Change the Logo image base on ship
            this.loginForm.get('ship').valueChanges.subscribe(value => {
                // Set url if value is not empty
                value ? this.urlLogo = this.IMAGES_URL + value + '.svg' : this.urlLogo = '';
            });
            // Getting the data from a service
            this.shipTypes = yield this.loginService.getShipTypes();
        });
    }
    isValid(control) {
        return (this.loginForm.controls[control].invalid && this.loginForm.controls[control].touched);
    }
    emailValid() {
        return control => {
            // tslint:disable-next-line: max-line-length
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(control.value) ? null : { invalidEmail: true };
        };
    }
    onSubmit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.loginForm.valid) {
                // Open spinner and set it to disable
                const dialogRef = this.dialog.open(SpinnerPopComponent, { width: '100px' });
                dialogRef.disableClose = true;
                // Get login boolean from the service API
                // const result: ShipTypes.IRespond = await this.loginService.login(this.loginForm.value);
                const logginSuccess = yield this.authService.emailPasswordSigninUser(this.loginForm.value);
                // Close spinner after get respond from the API
                dialogRef.close();
                setTimeout(() => {
                    if (!logginSuccess) {
                        this.loginForm.reset();
                    }
                    else {
                        this.router.navigate(['/request']);
                    }
                }, 1000);
            }
        });
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss'],
        providers: [ShipTypes.ShipTypes]
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map