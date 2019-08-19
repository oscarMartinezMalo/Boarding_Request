import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipCardCollectionComponent } from './ship-card-collection/ship-card-collection.component';
import { LoginComponent } from './auth/login/login.component';
import { RequestFormComponent } from './request/request-form/request-form.component';

import { AdminGuard } from './core/admin.guard';
import { CanReadGuard } from './core/can-read.guard';
import { AuthGuard } from './core/auth.guard';
import { AuthorGuard } from './core/author.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'request', component: RequestFormComponent, canActivate: [AuthGuard] },
  { path: 'ships', component: ShipCardCollectionComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
