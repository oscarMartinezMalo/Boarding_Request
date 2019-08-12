import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
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
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    
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
      console.log("Call login service");
    }
  }
}
