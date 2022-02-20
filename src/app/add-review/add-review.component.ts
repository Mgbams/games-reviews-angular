import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../model/reviews.model';
import { Player } from '../model/player.model';
import { AddGameService } from '../services/add-game.service';
import { ReviewsService } from '../services/reviews.service';
import { Game } from '../model/game.model';
import { DatePipe } from '@angular/common';
import { isLogStatus } from '../model/log-status.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  addReviewForm!: FormGroup;
  submitted = false;
  private id!: number;
  private game!: Game;
  private msgError: string = '';
  public isLogStatus!: isLogStatus;

  constructor(
    private notification: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private reviewGameService: ReviewsService,
    private datepipe: DatePipe,
    private auth: AuthService,
    private router: Router,
  ) {}
  

  ngOnInit(): void {
    this.addReviewForm = this.formBuilder.group({
      game: [null],
      description: [null, Validators.required],
      player_id: [null, Validators.required],
      publication_date_time: [],
      score: [
        null,
        Validators.compose([
          Validators.required,
          Validators.max(20),
          Validators.min(0),
        ]),
      ],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getGame();

    console.log('current user: ' + sessionStorage.getItem('currentUser'));
  }

  get addReviewFormControls() {
    return this.addReviewForm.controls;
  }

  submitForm() {
    let currentDateTime = this.datepipe.transform(
      new Date(),
      'yyyy-MM-dd h:mm:ss'
    );
    this.addReviewForm.patchValue({
      game: this.game,
      player_id: sessionStorage.getItem('currentUser'),
      publication_date_time: currentDateTime,
    });

    console.log(this.addReviewForm.value);

    this.reviewGameService.postSingleGame(this.addReviewForm.value).subscribe({
      next: () => {
        this.successfulSubmit();
      },
      error: () => this.errorDuringSubmission(),
    });

    this.isLogStatus = this.auth.isAuthenticated();
    if(this.isLogStatus.role !== "Player") {
      this.router.navigate(['home'])
    }

  }

  /*onSubmit() {
    this.submitted = true;
    if (this.addReviewForm.invalid) {
      return;
    }  

    this.addReviewForm.patchValue({
      game: this.game,
      player_id: sessionStorage.getItem('currentUser')
    });

    console.log(this.addReviewForm.value);

    this.reviewGameService.postSingleGame(this.addReviewForm.value).subscribe({
      next: () => {
        this.successfulSubmit();
      },
      error: () => this.errorDuringSubmission(),
    });
  }*/

  getGame(): void {
    this.reviewGameService.getSingleGame(this.id).subscribe({
      next: (data) => {
        this.addReviewForm.patchValue({
          game: data.name,
          description: '',
          score: 0,
        });

        this.game = data;
      },
      error: (error) => (this.msgError = error),
    });
  }

  successfulSubmit() {
    this.notification.open(`Jeu successfully created`, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style',
    });

    this.addReviewForm.reset();
    Object.keys(this.addReviewForm.controls).forEach((key) => {
      this.addReviewForm.get(key)?.setErrors(null);
    });
  }

  errorDuringSubmission() {
    this.notification.open("Game couldn't be created", undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style-error',
    });
  }
}
