import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './auth/login/login.component';
import { SpinnerPopComponent } from './spinner-pop/spinner-pop.component';
import { HubClientService } from './ship-card-collection/HubClientService.service';
import { ShipCardCollectionComponent } from './ship-card-collection/ship-card-collection.component';
import { ShipCardComponent } from './ship-card/ship-card.component';
import { RequestFormComponent } from './request/request-form/request-form.component';
import { LayoutModule } from '@angular/cdk/layout';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

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
  MatSnackBarModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatMenuModule,
  MatDatepickerModule
} from '@angular/material';

import { RequestListComponent } from './request-list/request-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { RequestTableComponent } from './request-table/request-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { NavegationBarComponent } from './navegation-bar/navegation-bar.component';
import { CalendarCustomComponent } from './calendar-custom/calendar-custom.component';
import { ShipNameComponent } from './ship-name/ship-name.component';
import { FormFieldCustomShipComponent } from './form-field-custom-ship/form-field-custom-ship.component';
import { ShipDropdownComponent } from './ship-dropdown/ship-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipCardCollectionComponent,
    ShipCardComponent,
    SpinnerPopComponent,
    LoginComponent,
    NavBarComponent,
    RequestFormComponent,
    NavegationBarComponent,
    CalendarCustomComponent,
    ShipNameComponent,
    FormFieldCustomShipComponent,
    ShipDropdownComponent,
    RequestTableComponent
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
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase, "ng-wallet-expenses"),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    NgxMaterialTimepickerModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [LoginComponent, SpinnerPopComponent],
  providers: [HubClientService],
  bootstrap: [AppComponent]
})
export class AppModule {}
