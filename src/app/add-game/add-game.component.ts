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
import { ActivatedRoute } from '@angular/router';
import { Game } from '../model/game.model';
import { DatePipe } from '@angular/common';
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
  actionBtn = 'Save';
  pageTitle = 'Add Game';

  addGameForm!: FormGroup;
  submitted = false;
  notificationDurationInSeconds = 4;
  gameId!: number;
  game!: Game;

  //Get by name attributes
  classificationByName!: Classification;
  publisherByName!: Publisher;
  genreByName!: Genre;
  businessModelByName!: BusinessModel;

  //Trial attributes for file upload
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message = '';
  imageName: any;

  public isLogStatus!: isLogStatus;

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private notification: MatSnackBar,
    private addGameService: AddGameService,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe,
    private auth: AuthService,
    private router: Router
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

    //pre-fill form when id is present
    this.activatedRoute.params.subscribe((params) => {
      this.gameId = +params['id'];

      if (this.gameId) {
        this.getGameById(this.gameId);
      }
    });
  }

  getGameById(gameId: number): void {
    this.addGameService.getSingleGame(gameId).subscribe({
      next: (data) => {
        this.game = data;

        //Change button name and page title when editing
        this.actionBtn = 'Edit';
        this.pageTitle = 'Edit Game';

        //Prefill form data
        this.addGameForm.patchValue({
          name: this.game.name,
          publisher: this.game.publisher.name,
          genre: this.game.genre.name,
          classification: this.game.classification.name,
          businessModel: this.game.businessModel.name,
          description: this.game.description,
          picture: this.game.picture,
          platform: this.addGameForm
            .get('platform')
            ?.setValue(this.game.platform.name, {
              onlySelf: true,
            }),
          releaseDate: this.datepipe.transform(
            this.game.releaseDate,
            'yyyy-MM-dd'
          ),
        });

        this.game = data;
        console.log(this.game);
      },
      error: (error) => (this.msgError = error),
    });
    this.isLogStatus = this.auth.isAuthenticated();
    if (this.isLogStatus.role !== 'Moderator') {
      this.router.navigate(['home']);
    }
  }

  get addGameFormControls() {
    return this.addGameForm.controls;
  }

  onSubmit() {
    let publishedDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    // TODO when project is
    // initialization of variables
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
      picture: this.selectedFile.name,
    });

    // If we are not editing the form
    if (!this.gameId) {
      this.createGame();
    } else {
      // If we are editing the form
      this.updateGame();
    }
  }

  createGame() {
    console.log(this.addGameForm.value);

    this.addGameService.postGame(this.addGameForm.value).subscribe({
      next: () => {
        this.successfulSubmit();
        //UploadImage
        this.onUpload();
      },
      error: () => this.errorDuringSubmission(),
    });
  }

  updateGame(): void {
    console.log(this.addGameForm.value);
    const classification = this.getClassificationByName(
      this.addGameForm.get('classification')?.value.trim()
    );

    const publisher = this.getPublisherByName(
      this.addGameForm.get('publisher')?.value
    );

    const genre = this.getGenreByName(this.addGameForm.get('genre')?.value);

    const businessModel = this.getBusinessModelByName(
      this.addGameForm.get('businessModel')?.value
    );

    // patch values before updating
    this.addGameForm.patchValue({
      publisher: publisher,
      genre: genre,
      classification: classification,
      businessModel: businessModel,
    });

    console.log(this.addGameForm.value);
  
    this.addGameService
      .updateGame(this.addGameForm.value, this.gameId)
      .subscribe({
        next: () => {
          this.successfulSubmit();
          //UploadImage
          this.onUpload();
        },
        error: () => this.errorDuringSubmission(),
      });
  }

  successfulSubmit() {
    this.notification.open(`Jeu successfully created`, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style',
    });

    this.addGameForm.reset();
    Object.keys(this.addGameForm.controls).forEach((key) => {
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
    this.notification.open(
      "Problem saving image. Image couldn't be saved",
      undefined,
      {
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 2500,
        panelClass: 'custom-style-error',
      }
    );
  }

  /* Get data for prefiling the select box of games form*/
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

  /*
   * Uploading image logic
   *Gets called when the user selects an image
   */
  public onFileChanged(event: any) {
    this.selectedFile = event.target?.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    this.addGameService.postGameImage(this.uploadedImage()).subscribe({
      next: () => console.log,
      error: () => this.imageErrorDuringSubmission(),
    });
  }

  uploadedImage() {
    const uploadImageData = new FormData();
    uploadImageData.append(
      'fileName',
      this.selectedFile,
      this.selectedFile.name
    );

    return uploadImageData;
  }

  // Get by name
  getClassificationByName(name: string): void {
    this.addGameService.getClassificationByName(name).subscribe({
      next: (res) => (this.classificationByName = res),
      error: (err) => (this.msgError = err),
    });
  }

  getPublisherByName(name: string): void {
    this.addGameService.getClassificationByName(name).subscribe({
      next: (res) => (this.publisherByName = res),
      error: (err) => (this.msgError = err),
    });
  }

  getGenreByName(name: string): void {
    this.addGameService.getClassificationByName(name).subscribe({
      next: (res) => (this.genreByName = res),
      error: (err) => (this.msgError = err),
    });
  }
  getBusinessModelByName(name: string): void {
    this.addGameService.getClassificationByName(name).subscribe({
      next: (res) => {
        this.businessModelByName = res;
        console.log(res);
        console.log(this.businessModelByName);
      },
      error: (err) => (this.msgError = err),
    });
  }
}
