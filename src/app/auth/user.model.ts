export enum RolesEnum {
    'reader',
    'employee',
    'contractor',
    'vendor',
    'admin'
}

export interface Roles {
    reader: boolean;
    employee?: boolean;
    contractor?: boolean;
    vendor?: boolean;
    admin?: boolean;
}

export class User {
    displayName: string;
    photoURL: string;
    email: string;
    uid: string;
    roles: Roles;

    constructor(authData: User) {
        this.uid = authData.uid;
        this.email = authData.email;
        this.displayName = authData.displayName;
        this.photoURL = authData.photoURL;
        this.roles = { reader: true };
    }
}
