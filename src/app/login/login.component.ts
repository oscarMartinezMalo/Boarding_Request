import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { shipTypes } from "./shipTypes.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [shipTypes]
})
export class LoginComponent implements OnInit {
  hide = true;
  urlLogo = '';
  shipTypes: string[];
  IMAGES_URL = './../../../assets/images/logos/black/';

  loginForm = this.fb.group({
    email: [null, [
      Validators.required,
      Validators.email,
      this.emailValid()
    ]],
    password: [null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)      
    ]],
    ship: [null, [
      Validators.required
    ]]
  })
  constructor(private fb: FormBuilder, private shipDropDown: shipTypes) { }

   async ngOnInit() {
    // Change the Logo image base on ship
    this.loginForm.get('ship').valueChanges.subscribe(value =>{
      // Set url if value is not empty
      value ? this.urlLogo =  this.IMAGES_URL + value + '.svg' : this.urlLogo = '';
    }); 

    // Getting the data from a service
    this.shipTypes = await this.shipDropDown.getShipTypes();
  }

  isValid(control) {
    return (this.loginForm.controls[control].invalid && this.loginForm.controls[control].touched);
  }

  emailValid() {
    return control => {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(control.value) ? null : { invalidEmail: true }
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginForm.reset();
    }
  }
}
