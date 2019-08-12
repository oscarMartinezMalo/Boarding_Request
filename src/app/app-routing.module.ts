import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipCardCollectionComponent } from "./ship-card-collection/ship-card-collection.component";
import { LoginComponent } from "./login/login.component";
import { RequestFormComponent } from './request-form/request-form.component';


const routes: Routes = [
  { path: '', component: ShipCardCollectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'testing', component: RequestFormComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
