export class User {
    constructor(authData) {
        this.uid = authData.uid;
        this.email = authData.email;
        this.displayName = authData.displayName;
        this.photoURL = authData.photoURL;
        this.roles = { reader: true };
    }
}
//# sourceMappingURL=user.js.map