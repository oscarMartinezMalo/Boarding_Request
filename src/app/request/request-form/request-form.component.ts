import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent {
  //// Expansion Panel
  step = 0;
  ////

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
    specialNeeds: ['no', Validators.required]
  });

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

  constructor(private fb: FormBuilder, private request: RequestService) { }

  onSubmit() {
    console.log(this.requestForm);
    if (this.requestForm.valid) {
      this.request.createRequest(this.requestForm.value);
    }
  }

  //// Expansion Panel
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
