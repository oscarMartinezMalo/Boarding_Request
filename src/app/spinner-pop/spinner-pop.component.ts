import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-spinner-pop',
  template: '<mat-spinner [diameter]="50" style="height: 60px"></mat-spinner>'
})
export class SpinnerPopComponent {
  constructor(public dialogRef: MatDialogRef<SpinnerPopComponent>) { }
}
