import { Component, OnInit, Input } from '@angular/core';
import { IShip } from '../models/ship.interface';

@Component({
  selector: 'app-ship-card',
  templateUrl: './ship-card.component.html',
  styleUrls: ['./ship-card.component.scss']
})
export class ShipCardComponent implements OnInit {

  @Input()
  public ship:IShip;
  
  constructor() { }

  ngOnInit() {
  }

  public logoUrl():string{
    let url =  "./../../assets/images/logos/black/" + this.ship.brand + ".svg";
    console.log(url);
    return url;
  }

  public shipImageUrl():string{
    let url =  "./../../assets/images/" + this.ship.brand + ".jpg";
    console.log(url);
    return url;
  }

}
