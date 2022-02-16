import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../shared/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted = false;
  temporaryData!: FormGroup;
  emailRegx =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  notificationDurationInSeconds = 5;

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private notification: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      pseudo: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      dateOfBirth: [null, Validators.required],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: [null,  Validators.compose([Validators.required])],
    }, {
      validators: this.MustMatch('password', 'confirmPassword')
    });

    this.dialogRef.backdropClick().subscribe(() => {
      if (this.signUpForm.touched && this.signUpForm.invalid && this.signUpForm.dirty ) {
        this.onRegistrationCancel();
        //this.signUpForm.patchValue(this.temporaryData); TODO
      }
    });
  }

  get signupFormControls() {
    return this.signUpForm.controls;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['errorsMustMatch']) {
        return 
      } 

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({MustMatch: true})
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.onClose();
  }

  // closing signup modal
  onClose() {
    //this.service.form.reset();
    //this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  // cancelling registration
  onRegistrationCancel() {
    console.log(this.signUpForm.value);
    this.dialogService
      .openConfirmDialog('Are you sure you want to exit your registration?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.openSnackBar();
        } else {
          // this.temporaryData = this.signUpForm.value; TODO
          this.dialogService.onSignUp();
        }
      });
  }

  openSnackBar() {
    this.notification.openFromComponent(NotificationComponent, {
      duration: this.notificationDurationInSeconds * 1000,
    });
  }
}
