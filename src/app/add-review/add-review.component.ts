import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  addGameForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addGameForm = this.formBuilder.group({
      game: [null, Validators.required],
      description: [null, Validators.required],
      score: [null,  Validators.compose([Validators.required, Validators.max(20), Validators.min(0)])],
    });
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
