export class IRespond {
}
export class ShipTypes {
    getShipTypes() {
        return new Promise((res, req) => {
            setTimeout(() => {
                const shipTypesDropdown = ['Z', 'R', 'C'];
                res(shipTypesDropdown);
            }, 1000);
        });
    }
    login(loginData) {
        return new Promise((res, req) => {
            setTimeout(() => {
                res({ status: 'error',
                    message: 'Login failed' });
            }, 1000);
        });
    }
}
//# sourceMappingURL=shipTypes.service.js.map