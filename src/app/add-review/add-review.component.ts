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

interface LoggedInUser {
  id: number;
  pseudonym: string;
  email: string;
  role: string;
  password?: string;
}

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {
  activePlayer: LoggedInUser = {
    id: 0,
    email: "",
    pseudonym: "",
    role: "",
    password: "default"
  };

  addReviewForm!: FormGroup;
  submitted = false;
  private id!: number;
  private game!: Game;
  private msgError: string = '';
  public isLogStatus!: isLogStatus;
  private player!: Player;
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
      game_id: [null],
      description: [null, Validators.required],
      player_id: [null, Validators.required],
      publication_date_time: [null],
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
    if (this.isLogStatus.role !== 'Player') {
      this.router.navigate(['home']);
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
      'yyyy-MM-dd hh:mm:ss'
    );
    console.log(this.addReviewForm.value);
    this.activePlayer =  JSON.parse(JSON.stringify(sessionStorage.getItem('currentUser')));
   // this.activePlayer.password = "Default";
    console.log(this.activePlayer);

    let player = {
      user_type: 'Player',
      id: 1,
      pseudonym: 'king',
      email: 'kingsley@gmail.com',
      password: 'password',
      phone_number: '',
      birth_date: '2009-02-05',
    };

    this.addReviewForm.patchValue({
      game_id: this.game,
      player_id: player,
      publication_date_time: currentDateTime,
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
    this.reviewGameService.getSingleGame(this.id).subscribe({
      next: (data) => {
        this.addReviewForm.patchValue({
          game_id: data.name,
          description: '',
          score: 0,
        });

        this.game = data;
        console.log(this.game);
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

  getLoggedInPlayer() {
    this.auth.getPlayerById(this.id).subscribe({
      next: (data) => this.player = data,
      error: (err) => this.msgError = err
    })
  }
}
