import { Component, OnInit, DoCheck, ElementRef, OnDestroy, Optional, Self, Input, HostBinding } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, FormGroup, FormBuilder } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';

// export class MyShip {
//   constructor(public shipName: string) { }
// }

@Component({
  selector: 'app-ship-dropdown',
  templateUrl: './ship-dropdown.component.html',
  styleUrls: ['./ship-dropdown.component.scss'],
  providers: [{
    provide: MatFormFieldControl,
    useExisting: ShipDropdownComponent
  }],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})

export class ShipDropdownComponent implements ControlValueAccessor, MatFormFieldControl<string>, OnInit, OnDestroy, DoCheck {
  // export class ShipDropdownComponent implements ControlValueAccessor, MatFormFieldControl<MyShip>, OnInit, OnDestroy, DoCheck {
  static nextId = 0;
  shipList: { value: string, name: string }[] = new Array<{ value: string, name: string }>();

  focused = false;
  errorState = false;
  controlType = 'app-ship-dropdown';
  autofilled?: boolean;
  @HostBinding() id = `app-ship-dropdown-${ShipDropdownComponent.nextId++}`;
  describedBy = '';

  shipForm: FormGroup;
  stateChanges = new Subject<void>();
  onChange: (delta: any) => {};
  onTouched: () => {};

  get empty() {
    const { value: { shipName } } = this.shipForm;
    return !shipName;
  }
  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  // tslint:disable-next-line: variable-name
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  // tslint:disable-next-line: variable-name
  private _required = false;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(dis: boolean) {
    this._disabled = coerceBooleanProperty(dis);
    this._disabled ? this.shipForm.disable() : this.shipForm.enable();
    this.stateChanges.next();
  }
  // tslint:disable-next-line: variable-name
  private _disabled = false;

  @Input()
  get value(): string | null {
    const { value: { shipName } } = this.shipForm;
    if (shipName) {
      // return new MyShip(shipName);
      return shipName.value;
    }
    return null;
  }
  // set value(ship: MyShip | null) {
  set value(ship: string | null) {
    // const { shipName } = ship || new MyShip('');
    this.shipForm.get('shipName').setValue(ship);
    this.stateChanges.next();
  }

  @Input()
  public get shipBrand(): string {
    return this._shipBrand;
  }
  public set shipBrand(value: string) {
    const oldShipBrand = this._shipBrand;
    this._shipBrand = value;

    // this.setValuesForShipList(oldShipBrand, this._shipBrand);
  }
  // tslint:disable-next-line: variable-name
  private _shipBrand: string;


  setValuesForShipList(oldBrand: string, brand: string): void {
    if (oldBrand !== brand) {
      this.value = null;
      this.shipForm.reset();
      this.onChange(null);
    }
    if (brand) {
      this.shipForm.enable();
      this.shipList = [{ value: 'ry', name: 'royal' }, { value: 'ce', name: 'celebrity' }, { value: 'za', name: 'zamara' }];
    } else {
      this.shipForm.disable();
    }
  }

  constructor(
    formBuilder: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.shipForm = formBuilder.group({
      // shipName: new FormControl({value: '', disabled: false})
      shipName: ''
    });

    fm.monitor(elRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }

      this.focused = !!origin;
      
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    // console.log(this.shipBrand);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'div') {
      // tslint:disable-next-line: no-non-null-assertion
      this.elRef.nativeElement.querySelector('div')!.focus();
    }
  }

  writeValue(val: any | null): void {
    // writeValue(val: MyShip | null): void {
    this.value = val;
    // this.shipForm.reset();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    // this._disabled = isDisabled;
    this.disabled = isDisabled;
  }
  handleInput(): void {
    // this.onChange(this.shipForm.value);
    this.onChange(this.shipForm.controls.shipName.value);
  }
}
