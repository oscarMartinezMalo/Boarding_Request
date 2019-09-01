import { Component, OnInit, forwardRef, Injector, DoCheck, ElementRef, OnDestroy, Optional, Self, Input, HostBinding, ɵConsole } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, FormGroup, FormBuilder } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';

export class MyShip {
  constructor(public shipName: string) { }
}

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

export class ShipDropdownComponent implements ControlValueAccessor, MatFormFieldControl<MyShip>, OnInit, OnDestroy, DoCheck {
  
  static nextId = 0;
  private _placeholder: string;
  private _required = false;
  private _disabled = false;
  autofilled?: boolean;

  shipList = [
    { value: 'ry', name: 'royal' },
    { value: 'ce', name: 'celebrity' },
    { value: 'za', name: 'zamara' }
  ];

  shipForm: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'ship-name';
  @HostBinding() id = `ship-dropdown-${ShipDropdownComponent.nextId++}`;
  describedBy = '';
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

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled() { return this._disabled; }
  set disabled(dis: boolean) {
    this._disabled = coerceBooleanProperty(dis);
    this._disabled ? this.shipForm.disable() : this.shipForm.enable();
    this.stateChanges.next();
  }

  @Input()
  get value(): MyShip | null {
    const { value: { shipName } } = this.shipForm;
    if (shipName) {
      return new MyShip(shipName);
    }
    return null;
  }
  set value(ship: MyShip | null) {
    const { shipName } = ship || new MyShip('');
    this.shipForm.setValue({ shipName });
    this.stateChanges.next();
  }

  @Input() shipBrand: string;


  constructor(
    formBuilder: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.shipForm = formBuilder.group({
      shipName: ''
    });

    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
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
    console.log(this.shipBrand);
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

  writeValue(val: MyShip | null): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  handleInput(): void {
    this.onChange(this.shipForm.value);
  }
}
