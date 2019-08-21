import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let ShipCardCollectionComponent = class ShipCardCollectionComponent {
    constructor(client) {
        this.client = client;
        this.ships = new Array();
    }
    ngOnInit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            (yield this.client.shipsByBrand("Just return everything")).forEach(ship => {
                this.ships.push(ship);
            });
        });
    }
    columns() {
        return 3;
    }
};
ShipCardCollectionComponent = tslib_1.__decorate([
    Component({
        selector: 'app-ship-card-collection',
        templateUrl: './ship-card-collection.component.html',
        styleUrls: ['./ship-card-collection.component.scss']
    })
], ShipCardCollectionComponent);
export { ShipCardCollectionComponent };
//# sourceMappingURL=ship-card-collection.component.js.map