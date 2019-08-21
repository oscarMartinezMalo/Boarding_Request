import * as _ from 'lodash';
export class AuthorizationRoles {
    // constructor(private auth: AuthService) {
    //     auth.user.pipe(map(user => {
    //         // set an array of use roles, ie ['admin', 'autor,...]
    //         return this.userRoles = _.keys(_.get(user, 'roles'));
    //     })).subscribe();
    // }
    constructor() { }
    ///// Authorization Logic /////
    get canCreate() {
        const allowed = ['admin', 'author', 'reader'];
        return this.matchingRole(allowed);
    }
    get canRead() {
        const allowed = ['admin', 'author', 'reader'];
        return this.matchingRole(allowed);
    }
    get canUpdate() {
        const allowed = ['admin', 'author'];
        return this.matchingRole(allowed);
    }
    get canDelete() {
        const allowed = ['admin'];
        return this.matchingRole(allowed);
    }
    /// Helper to determine if any matching roles exist
    matchingRole(allowedRoles) {
        // console.log(this.userRoles);
        return !_.isEmpty(_.intersection(allowedRoles, this.userRoles));
    }
}
//# sourceMappingURL=authorization-roles.js.map