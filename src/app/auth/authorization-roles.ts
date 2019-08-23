import * as _ from 'lodash';
import { RolesEnum } from './user.model';

export abstract class AuthorizationRoles {
    userRoles: Array<string>; // roles of the currently logged user

    constructor() { }

    //// Roles
    // reader | employee? | contractor? | vendor? | admin?

    ///// Authorization Logic /////
    // 'admin', 'employee', 'vendor'
    get canCreate(): boolean {
        const allowed = [ RolesEnum.admin, RolesEnum.vendor ];
        return this.matchingRole(allowed);
    }

    get canRead(): boolean {
        const allowed = [RolesEnum.admin, RolesEnum.employee, RolesEnum.vendor, RolesEnum.reader ];
        return this.matchingRole(allowed);
    }

    get canUpdate(): boolean {
        const allowed = [ RolesEnum.admin, RolesEnum.vendor ];
        return this.matchingRole(allowed);
    }

    get canDelete(): boolean {
        const allowed = [RolesEnum.admin ];
        return this.matchingRole(allowed);
    }

    /// Helper to determine if any matching roles exist
    private matchingRole(allowedRoles): boolean {
        // console.log(this.userRoles);
        return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
    }
}

