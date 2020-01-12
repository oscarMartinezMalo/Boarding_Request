import { Component, ViewEncapsulation, Input } from '@angular/core';
import { RequestService } from '../request/request.service';
import { FormGroup, FormControl, ControlValueAccessor } from '@angular/forms';
import { EventEmitter } from 'events';
import { RequestFormComponent } from '../request/request-form/request-form.component';

@Component({
  selector: 'app-calendar-custom',
  templateUrl: './calendar-custom.component.html',
  styleUrls: ['./calendar-custom.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarCustomComponent {
  @Input() dateAvailables: { date: string }[];
  @Input() parentForm: FormGroup;

  dateAssigned = new EventEmitter();

  calendar = new FormControl();

  constructor(private request: RequestService) { }

  //// Highlight Days Available.
  dateClass = (d: Date) => {
    const date = d.getDate();
    // console.log(this.parentForm.controls.firstName.value);
    // console.log((this.parentForm as unknown as FormGroup).controls.firstName.value);
    // tslint:disable-next-line: no-non-null-assertion
    // const dateAvailables = this.parentForm.dateAvailables;

    if ( this.dateAvailables.some(oneDay => oneDay.date.split('/')[1] === date.toString())) {
      return 'example-custom-date-class';
    } else {
      return undefined;
    }
  }

  // Dates Validation
  myFilter = (d: Date): boolean => {
    const date = d.getDate();
    const day = d.getDay();
    // Prevent no availables day from being selected.
    return this.dateAvailables.some(oneDay => oneDay.date.split('/')[1] === date.toString());
  }
}
