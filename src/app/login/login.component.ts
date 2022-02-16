import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nickname: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  get loginFormFormControls() {
    return this.loginForm.controls;
  }

  onSubmit () {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }


}
