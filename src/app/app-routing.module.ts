import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipCardCollectionComponent } from './ship-card-collection/ship-card-collection.component';
import { LoginComponent } from './auth/login/login.component';
import { RequestFormComponent } from './request/request-form/request-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'request', component: RequestFormComponent },
  { path: 'ships', component: ShipCardCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
