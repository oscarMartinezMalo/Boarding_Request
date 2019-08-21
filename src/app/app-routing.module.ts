import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipCardCollectionComponent } from './ship-card-collection/ship-card-collection.component';
import { LoginComponent } from './auth/login/login.component';
import { RequestFormComponent } from './request/request-form/request-form.component';

import { AdminGuard } from './guards/admin.guard';
import { CanReadGuard } from './guards/can-read.guard';
import { AuthGuard } from './guards/auth.guard';
import { WorkerGuard } from './guards/worker.guard';


const routes: Routes = [
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
    canActivate: [WorkerGuard]
  },
  {
    path: 'ships',
    component: ShipCardCollectionComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
