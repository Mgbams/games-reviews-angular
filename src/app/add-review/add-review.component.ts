import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isLogStatus } from '../model/log-status.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  addGameForm!: FormGroup;
  submitted = false;
  public isLogStatus!: isLogStatus;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.addGameForm = this.formBuilder.group({
      game: [null, Validators.required],
      description: [null, Validators.required],
      score: [null,  Validators.compose([Validators.required, Validators.max(20), Validators.min(0)])],
    });

    this.isLogStatus = this.auth.isAuthenticated();
    if(this.isLogStatus.role !== "Player") {
      this.router.navigate(['home'])
    }

  }

  get addGameFormControls() {
    return this.addGameForm.controls;
  }

  onSubmit () {
    this.submitted = true;

    if (this.addGameForm.invalid) {
      return;
    }
    this.addGameForm.reset();
  }

}
