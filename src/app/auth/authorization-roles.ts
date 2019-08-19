import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

export abstract class AuthorizationRoles {
    userRoles: Array<string>; // roles of the currently logged user

    // constructor(private auth: AuthService) {
    //     auth.user.pipe(map(user => {
    //         // set an array of use roles, ie ['admin', 'autor,...]
    //         return this.userRoles = _.keys(_.get(user, 'roles'));
    //     })).subscribe();
    // }

    constructor() {}

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
}

