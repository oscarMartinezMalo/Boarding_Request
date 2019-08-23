import * as _ from 'lodash';

export abstract class AuthorizationRoles {
    userRoles: Array<string>; // roles of the currently logged user

    constructor() { }

    //// Roles
    // reader | employee? | contractor? | vendor? | admin?

    ///// Authorization Logic /////
    get canCreate(): boolean {
        const allowed = ['admin', 'employee', 'vendor'];
        return this.matchingRole(allowed);
    }

    get canRead(): boolean {
        const allowed = ['admin', 'employee', 'vendor', 'reader'];
        return this.matchingRole(allowed);
    }

    get canUpdate(): boolean {
        const allowed = ['admin', 'vendor'];
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

