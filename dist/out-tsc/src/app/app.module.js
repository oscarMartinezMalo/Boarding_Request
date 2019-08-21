import * as tslib_1 from "tslib";
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
import { MatProgressSpinnerModule, MatRadioModule, MatListModule, MatSidenavModule, MatToolbarModule, MatSelectModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
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
            MatProgressSpinnerModule,
            MatSnackBarModule,
            AngularFireModule.initializeApp(environment.firebase, 'ng-wallet-expenses'),
            AngularFirestoreModule,
            AngularFireAuthModule,
            AngularFireStorageModule,
            AngularFireDatabaseModule
        ],
        entryComponents: [
            LoginComponent,
            SpinnerPopComponent
        ],
        providers: [HubClientService],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map