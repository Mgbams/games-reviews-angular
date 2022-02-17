import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  credentials = {username: '', password: ''};

  constructor(public dialogRef: MatDialogRef<LoginComponent>, 
              private formBuilder: FormBuilder,
              private auth: AuthService,
              private http: HttpClient, 
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      pseudonym: [null, [Validators.required]],
      password: [null, Validators.required]
    });

  }

  onSubmit () {
    this.auth.authenticate(this.loginForm.value);
    this.onClose();
  }

  onClose() {
    //this.service.form.reset();
    //this.service.initializeFormGroup();
    this.dialogRef.close();
  }


}
