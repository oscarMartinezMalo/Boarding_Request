import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
let RequestService = class RequestService {
    constructor(afs, auth) {
        this.afs = afs;
        this.auth = auth;
        auth.user.pipe(map(user => {
            this.userId = _.get(user, 'uid');
        })).subscribe();
    }
    getRequests() {
        return this.afs.doc(`fleetRequests`).valueChanges();
    }
    getRequest(key) {
        return this.afs.doc(`fleetRequests/${key}`).valueChanges();
    }
    //// User Actions
    createRequest(fleetRequest) {
        if (this.auth.canCreate && this.userId) {
            // Add a new document in collection "fleetRequests" with document having 'userId'
            fleetRequest.userId = this.userId;
            this.afs.collection(`fleetRequests`).add(fleetRequest);
        }
        else {
            console.log('action prevented!');
        }
    }
    updateRequest(fleetRequest, newData) {
        if (this.auth.canUpdate) {
            this.afs.doc(`fleetRequests/${fleetRequest.key}`).update(newData);
        }
        else {
            console.log('action prevented!');
        }
    }
    deleteRequest(key) {
        if (this.auth.canDelete) {
            this.afs.doc(`fleetRequests/${key}`).delete();
        }
        else {
            console.log('action prevented!');
        }
    }
};
RequestService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], RequestService);
export { RequestService };
//# sourceMappingURL=request.service.js.map