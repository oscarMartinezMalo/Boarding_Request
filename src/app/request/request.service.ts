import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { FleetRequest } from '../models/fleet-request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  userId: string;

  constructor(private afs: AngularFirestore, private auth: AuthService) {

    auth.user.pipe(map(user => {
      this.userId = _.get(user, 'uid');
    })).subscribe();
  }

  getRequests() {
    return this.afs.doc<firebase.User>(`fleetRequests`).valueChanges();
  }

  getRequest(key) {
    return this.afs.doc<firebase.User>(`fleetRequests/${key}`).valueChanges();
  }

  //// User Actions

  createRequest(fleetRequest) {
    if ( this.auth.canCreate  && this.userId) {
      // Add a new document in collection "fleetRequests" with document having 'userId'
      fleetRequest.userId = this.userId;
      this.afs.collection<FleetRequest>(`fleetRequests`).add(fleetRequest);
    } else {
      console.log('action prevented!');
    }
  }

  updateRequest(fleetRequest, newData) {
    if (this.auth.canUpdate) {
      this.afs.doc<FleetRequest>(`fleetRequests/${fleetRequest.key}`).update(newData);
    } else {
      console.log('action prevented!');
    }
  }

  deleteRequest(key) {
    if (this.auth.canDelete) {
      this.afs.doc<FleetRequest>(`fleetRequests/${key}`).delete();
    } else {
      console.log('action prevented!');
    }
  }
}
