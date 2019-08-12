import { Component, OnInit, Input } from '@angular/core';
import { IShip } from './../models/ship.interface';
import { HubClientService } from './HubClientService.service';

@Component({
  selector: 'app-ship-card-collection',
  templateUrl: './ship-card-collection.component.html',
  styleUrls: ['./ship-card-collection.component.scss']
})

export class ShipCardCollectionComponent implements OnInit {

  private shipLength: number;
  private ships: IShip[] = new Array<IShip>();
  
  constructor( private client: HubClientService) {   }

  async ngOnInit() {
    (await this.client.shipsByBrand("Just return everything")).forEach(ship=>{
      this.ships.push(ship);
    });  
  }

  public columns():number{
    return 3;
  }

}
