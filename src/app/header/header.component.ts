import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { DialogService } from '../shared/dialog.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  /*initializeFormGroup() {
    this.initializeFormGroup.setValue({
      fullName: '',
      department: 0,
      gender: '1'
    })
  }*/

  onSignUp(): void {
    this.dialogService.onSignUp();
  }

  onLogin(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '70vw',
      height: '65vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log;
    });

  }

}
