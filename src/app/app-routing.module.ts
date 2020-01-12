import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipCardCollectionComponent } from './ship-card-collection/ship-card-collection.component';
import { LoginComponent } from './auth/login/login.component';
import { RequestFormComponent } from './request/request-form/request-form.component';

import { AdminGuard } from './guards/admin.guard';
import { CanReadGuard } from './guards/can-read.guard';
import { AuthGuard } from './guards/auth.guard';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestTableComponent } from './request-table/request-table.component';
import { EmployeeGuard } from './guards/employee.guard';
import { CalendarCustomComponent } from './calendar-custom/calendar-custom.component';


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
    canActivate: [EmployeeGuard]
  },
  {
    path: 'ships',
    component: ShipCardCollectionComponent,
    canActivate: [AdminGuard]
  }
  ,
  {
    path: 'requestTable',
    component: RequestTableComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
