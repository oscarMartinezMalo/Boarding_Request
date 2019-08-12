import { IShip } from '../models/ship.interface';

export class HubClientService {
    private ships: IShip[] = new Array<IShip>();

    shipsByBrand(brand: string): Promise<IShip[]>{

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


       return new Promise((resolve, reject)=>{
            resolve(this.ships);
        })
    }

}

