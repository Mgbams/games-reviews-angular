import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../shared/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification/notification.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted = false;
  temporaryData!: FormGroup;
  notificationDurationInSeconds = 5;
  emailRegx =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private notification: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        pseudonym: [null, Validators.required],
        email: [
          null,
          [Validators.required, Validators.pattern(this.emailRegx)],
        ],
        birth_date: [null, Validators.required],
        password: [
          null,
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
      },
      {
        validators: this.MustMatch('password', 'confirmPassword'),
      }
    );

    this.dialogRef.backdropClick().subscribe(() => {
      if (
        this.signUpForm.touched &&
        this.signUpForm.invalid &&
        this.signUpForm.dirty
      ) {
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

      if (
        matchingControl.errors &&
        !matchingControl.errors['errorsMustMatch']
      ) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }

    this.submitValidFormFields();
  }

  submitValidFormFields(): void {
    this.signUpForm.patchValue({
      birth_date: this.formatBirthDate(),
    });

    this.loginService.postPlayer(this.signUpForm.value).subscribe({
      next: () => {
        this.successfulSubmit();
      },
      error: () => this.errorDuringSubmission(),
    });
  }

  // closing signup modal
  onClose() {
    this.dialogRef.close();
  }

  // cancelling registration
  onRegistrationCancel() {
    this.dialogService
      .openConfirmDialog('Are you sure you want to exit your registration?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.cancelRegistration();
        } else {
          // this.temporaryData = this.signUpForm.value; TODO
          this.dialogService.onSignUp();
        }
      });
  }

  formatBirthDate(): string {
    let day = this.signUpForm.get('birth_date')?.value.getDate();
    let month = this.signUpForm.get('birth_date')?.value.getMonth() + 1;
    let year = this.signUpForm.get('birth_date')?.value.getFullYear();
    let dateFormat = year + '-' + month + '-' + day;
    return dateFormat;
  }

  successfulSubmit() {
    this.notification.open(`Player successfully created`, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style',
    });

    this.signUpForm.reset();
    Object.keys(this.signUpForm.controls).forEach((key) => {
      this.signUpForm.get(key)?.setErrors(null);
    });

    // close the signup modal on successful signup
    this.onClose();
  }

  errorDuringSubmission() {
    this.notification.open("Player couldn't be created", undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style-error',
    });
  }

  cancelRegistration() {
    this.notification.open('Registration was cancelled', undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style-warn',
    });
  }
}
