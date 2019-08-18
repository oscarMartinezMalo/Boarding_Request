import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { FleetRequest } from './fleet-request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  userRoles: Array<string>; // roles of the currently logged user

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    auth.user.pipe(map(user => {
      // set an array of use roles, ie ['admin', 'autor,...]
      return this.userRoles = _.keys(_.get(user, 'roles'));
    })).subscribe();
  }

  getRequests() {
    return this.afs.doc<firebase.User>(`fleetRequests`).valueChanges();
  }

  getRequest(key) {
    return this.afs.doc<firebase.User>(`fleetRequests/${key}`).valueChanges();
  }

  ///// Authorization Logic /////
  get canCreate(): boolean {
    const allowed = ['admin', 'author', 'reader'];
    return this.matchingRole(allowed);
  }

  get canRead(): boolean {
    const allowed = ['admin', 'author', 'reader'];
    return this.matchingRole(allowed);
  }

  get canUpdate(): boolean {
    const allowed = ['admin', 'author'];
    return this.matchingRole(allowed);
  }

  get canDelete(): boolean {
    const allowed = ['admin'];
    return this.matchingRole(allowed);
  }


  /// Helper to determine if any matching roles exist
  private matchingRole(allowedRoles): boolean {
    // console.log(this.userRoles);
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
  }

  //// User Actions

  createRequest(fleetRequest) {
    if (this.canCreate) {
      this.afs.doc<FleetRequest>(`fleetRequests`).set(fleetRequest);
    } else {
      console.log('action prevented!');
    }
  }

  updateRequest(fleetRequest, newData) {
    if (this.canUpdate) {
      this.afs.doc<FleetRequest>(`fleetRequests/${fleetRequest.key}`).update(newData);
    } else {
      console.log('action prevented!');
    }
  }

  deleteRequest(key) {
    if (this.canDelete) {
      this.afs.doc<FleetRequest>(`fleetRequests/${key}`).delete();
    } else {
      console.log('action prevented!');
    }
  }
}
