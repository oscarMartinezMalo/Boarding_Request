import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShipCardCollectionComponent } from './ship-card-collection/ship-card-collection.component';
import { LoginComponent } from './auth/login/login.component';
import { RequestFormComponent } from './request/request-form/request-form.component';
import { AdminGuard } from './core/admin.guard';
import { AuthorGuard } from './core/author.guard';
const routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'request',
        component: RequestFormComponent,
        canActivate: [AuthorGuard]
    },
    {
        path: 'ships',
        component: ShipCardCollectionComponent,
        canActivate: [AdminGuard]
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map