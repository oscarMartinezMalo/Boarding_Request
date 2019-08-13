export class shipTypes {

    getShipTypes(): Promise<string[]> {        

        return new Promise((resolve, req) => {
            setTimeout(() => {
                let shipTypesDropdown = ['Z','R','C'];
                resolve(shipTypesDropdown);
            }, 5000);
        });
    }
}