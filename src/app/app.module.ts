import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpinnerPopComponent, LoginComponent } from './login/login.component';
import { HubClientService } from './ship-card-collection/HubClientService.service';
import { ShipCardCollectionComponent } from './ship-card-collection/ship-card-collection.component';
import { ShipCardComponent } from './ship-card/ship-card.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { LayoutModule } from '@angular/cdk/layout';

import {
  MatProgressSpinnerModule,
  MatRadioModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatDialogRef
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ShipCardCollectionComponent,
    ShipCardComponent,
    SpinnerPopComponent,
    LoginComponent,
    NavBarComponent,
    RequestFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    LoginComponent,
    SpinnerPopComponent
  ],
  providers: [HubClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
