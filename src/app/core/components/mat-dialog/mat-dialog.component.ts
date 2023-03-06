import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpResultType } from '../../types/pop-up.types';
import { PopUpProperties } from '../../types/pop-up.types';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss'],
})
export class MatDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PopUpProperties,
    public dialogRef: MatDialogRef<MatDialogComponent>
  ) {}

  close(confirm: PopUpResultType): void {
    this.dialogRef.close(confirm);
  }
}
