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

  datesAvailable: {date: string}[] = [
      { date: '8/30/2019' },
      { date: '8/20/2019' },
      // { date: '8/9/2019' },
      // { date: '8/6/2018' },
      // { date: '8/1/2019' },
      // { date: '8/25/2019' },
      // { date: '8/3/2019' },
      // { date: '8/17/2019' },
      // { date: '8/4/2019' },
      // { date: '8/16/2019' },
      // { date: '8/24/2019' },
      // { date: '8/21/2019' },
      // { date: '8/9/2019' },
      // { date: '8/28/2019' }
    ];

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private snackBar: MatSnackBar) {

    auth.user.pipe(map(user => {
      this.userId = _.get(user, 'uid');
    })).subscribe();
  }

  async getDayOnPort(month: number, year: number) {
    return await new Promise(res => {
      setTimeout(() => {
        res(this.datesAvailable);
      }, 2000);
    });
  }

  getRequests() {
    return this.afs.doc<firebase.User>(`fleetRequests`).valueChanges();
  }

  getRequest(key) {
    return this.afs.doc<firebase.User>(`fleetRequests/${key}`).valueChanges();
  }

  //// User Actions

  async createRequest(fleetRequest: FleetRequest) {

    if (this.auth.canCreate && this.userId) {
      // Add a new document in collection "fleetRequests" with document having 'userId'
      fleetRequest.userId = this.userId;
      fleetRequest.state = 'pending';
      const response = await this.afs.collection<FleetRequest>(`fleetRequests`).add(fleetRequest);
      this.displayMessaggeSnackBar('Request sended', response.id);
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

  displayMessaggeSnackBar(message: string, code: string) {
    this.snackBar.open(message, code, {
      duration: 3000,
    });
  }
}
