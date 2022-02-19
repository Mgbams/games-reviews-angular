import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../shared/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification/notification.component';
import { AddGameService } from '../services/add-game.service';
import { Platform } from '../model/platform.model';
import { Classification } from '../model/classification.model';
import { Genre } from '../model/genre.model';
import { Publisher } from '../model/publisher.model';
import { BusinessModel } from '../model/model_business.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { isLogStatus } from '../model/log-status.model';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css'],
})
export class AddGameComponent implements OnInit {
  classification: Classification[] = [];
  genres: Genre[] = [];
  platforms: Platform[] = [];
  publishers: Publisher[] = [];
  businessModels: BusinessModel[] = [];
  msgError = '';

  addGameForm!: FormGroup;
  submitted = false;
  notificationDurationInSeconds = 4;

  public isLogStatus! : isLogStatus;

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private notification: MatSnackBar,
    private addGameService: AddGameService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getClassifications();
    this.getGenres();
    this.getPlatforms();
    this.getPublishers();
    this.getBusinessModels();

    this.addGameForm = this.formBuilder.group({
      name: [null, Validators.required],
      publisher: [null, Validators.required],
      releaseDate: [null, Validators.required],
      description: [null, Validators.required],
      genre: [null, Validators.required],
      classification: [null, Validators.required],
      platforms: [null, Validators.required],
      businessModel: [null, Validators.required],
      fileName: [null, Validators.required],
      moderatorId: '',
      picture: '',
    });

    this.isLogStatus = this.auth.isAuthenticated();
    if(this.isLogStatus.role !== "Moderator") {
      this.router.navigate(['home'])
    }
  }

  get addGameFormControls() {
    return this.addGameForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addGameForm.invalid) {
      return;
    }

    let publishedDate = this.FormatDate();
    let formattedFileName = this.addGameForm
      .get('fileName')
      ?.value.replace('C:\\fakepath\\', '');

    // TODO when project is integrated
    let moderator = {
      user_type: 'moderator',
      id: 1,
      pseudonym: 'king',
      email: 'kingsley@gmail.com',
      password: 'password',
      phone_number: '3378245679',
      birth_date: '2009-02-05',
    };

    this.addGameForm.patchValue({
      moderatorId: moderator,
      releaseDate: publishedDate,
      picture: this.addGameForm.get('fileName')?.value,
    });

    this.addGameService.postGame(this.addGameForm.value).subscribe({
      next: () => {
        this.successfulSubmit();
        this.addGameService.postGameImage(this.addGameForm.get('fileName')?.value).subscribe({
          next: () => console.log,
          error: () => this.imageErrorDuringSubmission()
        })
      },
      error: () => this.errorDuringSubmission(),
    });
  }

  FormatDate(): string {
    let day = this.addGameForm.get('releaseDate')?.value.getDate();
    let month = this.addGameForm.get('releaseDate')?.value.getMonth() + 1;
    let year = this.addGameForm.get('releaseDate')?.value.getFullYear();
    let dateFormat = year + '-' + month + '-' + day;
    return dateFormat;
  }

  successfulSubmit() {
    this.notification.open(`Jeu successfully created`, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style',
    });

    this.addGameForm.reset();
    Object.keys(this.addGameForm.controls).forEach(key => {
      this.addGameForm.get(key)?.setErrors(null);
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

  imageErrorDuringSubmission() {
    this.notification.open("Problem saving image. Image couldn't be saved", undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style-error',
    });
  }

  getClassifications(): void {
    this.addGameService.getClassifications().subscribe({
      next: (data: Classification[]) => {
        this.classification = data;
      },
      error: (error) => (this.msgError = error),
    });
  }

  getGenres(): void {
    this.addGameService.getGenres().subscribe({
      next: (data: Genre[]) => {
        this.genres = data;
      },
      error: (error) => (this.msgError = error),
    });
  }

  getPlatforms(): void {
    this.addGameService.getPlatforms().subscribe({
      next: (data: Platform[]) => {
        this.platforms = data;
      },
      error: (error) => (this.msgError = error),
    });
  }

  getPublishers(): void {
    this.addGameService.getPublishers().subscribe({
      next: (data: Publisher[]) => {
        this.publishers = data;
      },
      error: (error) => (this.msgError = error),
    });
  }

  getBusinessModels(): void {
    this.addGameService.getBusinessModel().subscribe({
      next: (data: BusinessModel[]) => {
        this.businessModels = data;
      },
      error: (error) => (this.msgError = error),
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length === null) {
      return;
    }
  }
}
