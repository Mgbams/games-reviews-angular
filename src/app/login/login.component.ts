import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  credentials = { username: '', password: '' };

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private notification: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      pseudonym: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  get loginFormFormControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.auth.authenticate(this.loginForm.value);
  
   // this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }

}
