import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, SelectControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-ship-name',
  templateUrl: './ship-name.component.html',
  styleUrls: ['./ship-name.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShipNameComponent),
      multi: true
    }
  ]
})
export class ShipNameComponent implements ControlValueAccessor {

  ships = [
    { value: 'ry', name: 'royal' },
    { value: 'ce', name: 'celebrity' },
    { value: 'za', name: 'zamara' }
  ];

  public value: string;
  public disabled: boolean;
  onChange: () => void;
  onTouched: () => void;

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }


}



// template: <input (change)="shipChange($event)" >
// export class ShipNameComponent implements ControlValueAccessor {

//   ships = [
//     {value: 'ry', name: 'royal'},
//     {value: 'ce', name: 'celebrity'},
//     {value: 'za', name: 'zamara'}
//   ];

//   public value: string;
//   public disabled: boolean;
//   onChange: any = () => void;
//   onTouched: any = () => void;


//   writeValue(value: string): void {
//     this.value = value ? value : '';
//   }
//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }
//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }
//   setDisabledState?(isDisabled: boolean): void {
//     this.disabled = isDisabled;
//   }

// }
