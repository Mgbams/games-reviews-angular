import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { SignupComponent } from '../signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: string) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '40vw',
      height: '30vh',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: {top: "10px"},
      data: {
        message: msg
      }
    })
  }

  onSignUp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '70vw',
      height: '65vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log;
    });
  }
}
