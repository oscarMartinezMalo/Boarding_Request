import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-spinner-pop',
  templateUrl: './spinner-pop.component.html',
  styleUrls: ['./spinner-pop.component.scss']
})
export class SpinnerPopComponent {
  constructor(public dialogRef: MatDialogRef<SpinnerPopComponent>) { }
}
