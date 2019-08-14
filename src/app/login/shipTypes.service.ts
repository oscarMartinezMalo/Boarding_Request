import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

interface ILogin {
    user: string;
    password: string;
    ship: string;
}

export class IRespond {
    status: string;
    message: string;
}

export class ShipTypes {

    getShipTypes(): Promise<string[]> {

        return new Promise((res: any, req: any) => {
            setTimeout(() => {
                const shipTypesDropdown = ['Z', 'R', 'C'];
                res(shipTypesDropdown);
            }, 5000);
        });
    }

    login(loginData: ILogin): Promise<IRespond> {
        return new Promise((res: any, req: any) => {
            setTimeout(() => {
                res(
                    {status: 'error',
                    message: 'Login failed'}
                );
            }, 3000);
        });
    }
}
