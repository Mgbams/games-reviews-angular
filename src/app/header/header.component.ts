import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { isLogStatus } from '../model/log-status.model';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../shared/dialog.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  public isLogStatus! : isLogStatus;
  public isLogin = false;

  constructor(  private dialog: MatDialog, 
                private dialogService: DialogService,
                private auth: AuthService,
                private router: Router) { 
                  
                }
                
  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      this.isLogStatus = this.auth.isAuthenticated();
      this.isLogin = true;
    } 
  }

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

  public addGame() {
    this.router.navigate(['add-game'])
  }

  public ModeratorPage() {
    this.router.navigate(['moderator-page'])
  }
}
