import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestFormComponent implements OnInit {

  //// Expansion Panel
  step = 0;
  ////

  // hasUnitNumber = false;
  requestTypes = [
    { value: 'Crew Guests' },
    { value: 'Employee Business' },
    { value: 'Large Group' },
    { value: 'One Time Only Visit' },
    { value: 'Vendor/ Contractor' }];

  shipContacts = [
    { name: 'Bosun', abbreviation: 'BO' },
    { name: 'Weather', abbreviation: 'WE' },
    { name: 'Vocal Captain', abbreviation: 'VC' },
    { name: 'T&D Manager', abbreviation: 'TD' }
  ];

  requestForm = this.fb.group({
    requestType: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    country: [null, Validators.required],
    portNumber: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    boardingDate: [null, Validators.required],
    shipContact: [null, Validators.required],
    specialNeeds: ['no', Validators.required],
    shipName: ['', Validators.required],
    calendar: [null]
  });

  dateAvailables;
  constructor(private fb: FormBuilder, private request: RequestService) {
  }

  async ngOnInit(): Promise<void> {
    // Get the availables days
    this.dateAvailables = await this.request.getDayOnPort(12, 12);
  }

  //// Date
  // Date Picker assign availables dates
  dateClass = async (d: Date) => {
    const date = d.getDate();
    // Highlight the 1st and 20th day of each month.
    console.log(date);
    return 'example-custom-date-class';
    // return (date === 30 || date === 20) ? 'example-custom-date-class' : undefined;
  }

  // Date Validation
  myFilter = (d: Date): boolean => {

    const date = d.getDate();
    const day = d.getDay();
    // Prevent no availables day from being selected.
    return this.dateAvailables.some((oneDay) => {
      return oneDay.date.split('/')[1] === date.toString();

      // Prevent Saturday and Sunday from being selected.
      // return day !== 0 && day !== 6;

    });

  }
  ////

  onSubmit() {
    console.log(this.requestForm.controls);
    if (this.requestForm.valid) {
      this.request.createRequest(this.requestForm.value);
    }
  }

  // Expansion Panel
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  //// Expansion Panel
}
