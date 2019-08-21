import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let ShipCardComponent = class ShipCardComponent {
    constructor() { }
    ngOnInit() {
    }
    logoUrl() {
        let url = "./../../assets/images/logos/black/" + this.ship.brand + ".svg";
        console.log(url);
        return url;
    }
    shipImageUrl() {
        let url = "./../../assets/images/" + this.ship.brand + ".jpg";
        console.log(url);
        return url;
    }
};
tslib_1.__decorate([
    Input()
], ShipCardComponent.prototype, "ship", void 0);
ShipCardComponent = tslib_1.__decorate([
    Component({
        selector: 'app-ship-card',
        templateUrl: './ship-card.component.html',
        styleUrls: ['./ship-card.component.scss']
    })
], ShipCardComponent);
export { ShipCardComponent };
//# sourceMappingURL=ship-card.component.js.map