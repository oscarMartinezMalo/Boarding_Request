import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as ShipTypes from './shipTypes.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SpinnerPopComponent } from '../spinner-pop/spinner-pop.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ShipTypes.ShipTypes]
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
  });

  constructor(
    private fb: FormBuilder,
    private loginService: ShipTypes.ShipTypes,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  async ngOnInit() {
    // Change the Logo image base on ship
    this.loginForm.get('ship').valueChanges.subscribe(value => {
      // Set url if value is not empty
      value ? this.urlLogo = this.IMAGES_URL + value + '.svg' : this.urlLogo = '';
    });

    // Getting the data from a service
    this.shipTypes = await this.loginService.getShipTypes();
  }

  isValid(control) {
    return (this.loginForm.controls[control].invalid && this.loginForm.controls[control].touched);
  }

  emailValid() {
    return control => {
      // tslint:disable-next-line: max-line-length
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(control.value) ? null : { invalidEmail: true };
    };
  }

  async onSubmit(): Promise<any> {

    if (this.loginForm.valid) {
      // Open spinner and set it to disable
      const dialogRef = this.dialog.open(SpinnerPopComponent, { width: '100px' });
      dialogRef.disableClose = true;

      // Get login boolean from the service API
      const result: ShipTypes.IRespond = await this.loginService.login(this.loginForm.value);

      // Close spinner after get respond from the API
      dialogRef.close();

      dialogRef.afterClosed().subscribe(() => {
        console.log(result.message);
        this.router.navigate(['/request']);
      });
      this.loginForm.reset();
    }
  }
}
