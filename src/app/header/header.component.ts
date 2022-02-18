import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../shared/dialog.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLogStatus : any;

  constructor(  private dialog: MatDialog, 
                private dialogService: DialogService,
                private auth: AuthService) { 
                  
                  
                }

  ngOnInit(): void {
    this.isLogStatus = this.auth.isAuthenticated()
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

  public LogOut() {
    this.auth.Logout();
  }
}
