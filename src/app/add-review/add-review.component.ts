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
import { RequestApiService } from '../services/request-api.service';

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
  public idValue!: Player;

  constructor(
    private notification: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private reviewGameService: ReviewsService,
    private datepipe: DatePipe,
    private auth: AuthService,
    private router: Router,
    private requestApiService: RequestApiService
  ) {}
  

  ngOnInit(): void {
    this.addReviewForm = this.formBuilder.group({
      game: [null],
      description: [null, Validators.required],
      player_id: [null, Validators.required],
      // publication_date_time: [],
      score: [
        null,
        Validators.compose([
          Validators.required,
          Validators.max(20),
          Validators.min(0),
        ]),
      ],
    });

    this.isLogStatus = this.auth.isAuthenticated();
    if(this.isLogStatus.role !== "Player") {
      this.router.navigate(['home'])
    } else {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.getGame();
    }
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
      player_id: this.idValue,
      // publication_date_time: currentDateTime,
    });

    console.log(this.addReviewForm.value);

    this.reviewGameService.postReview(this.addReviewForm.value).subscribe({
      next: () => {
        this.successfulSubmit();
      },
      error: () => this.errorDuringSubmission(),
    });
  }

  getGame(): void {
    this.requestApiService.getSingleGame(this.id).subscribe({
      next: (value: any) => {
        this.game = value;
      },
      error: (error) => {
        this.router.navigate(['**']);
      },
    });
  }

  successfulSubmit() {
    this.notification.open(`Reviews successfully created`, undefined, {
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
    this.notification.open("Reaview couldn't be created", undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style-error',
    });
  }
}
