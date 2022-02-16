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

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      pseudo: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  onSubmit () {
    this.onClose();
  }

  onClose() {
    //this.service.form.reset();
    //this.service.initializeFormGroup();
    this.dialogRef.close();
  }


}
