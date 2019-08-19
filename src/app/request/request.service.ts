import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
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
  userId: string;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    auth.user.pipe(map(user => {
      this.userId = _.get(user, 'uid');
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

  // getItemsList(): AngularFirestoreCollection<

  //// User Actions

  createRequest(fleetRequest) {
    if (this.canCreate && this.userId) {
      // Add a new document in collection "fleetRequests" with ID 'userId'
      this.afs.collection<FleetRequest>(`fleetRequests`).doc(`${this.userId}`).collection<Request>(`requests`).add(fleetRequest);
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
