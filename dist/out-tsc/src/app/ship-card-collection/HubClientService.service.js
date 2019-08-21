export class HubClientService {
    constructor() {
        this.ships = new Array();
    }
    shipsByBrand(brand) {
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "R" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "R" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "Z" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "R" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "R" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "R" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "C" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "C" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "C" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "C" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "Z" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "Z" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "Z" });
        this.ships.push({ code: "AD", shortName: "ADVENTURE", name: "AD", brand: "R" });
        return new Promise((resolve, reject) => {
            resolve(this.ships);
        });
    }
}
//# sourceMappingURL=HubClientService.service.js.map