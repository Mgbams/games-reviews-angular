import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AddGameService } from '../services/add-game.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit {
  //Attributes for file upload
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message = '';
  imageName: any;
  uploadImageData!: any;

  gameId!: number;
  public imageUploadForm!: FormGroup;

  constructor(
    private addGameService: AddGameService,
    private notification: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.gameId = +params['id'];
    });

   /* this.imageUploadForm = this.formBuilder.group({
      picture: [null],
    });*/
  }

  successfulSubmit() {
    this.notification.open(`Image successfully submitted`, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3500,
      panelClass: 'custom-style',
    });
  }

  imageErrorDuringSubmission() {
    this.notification.open(
      "Problem saving image. Image couldn't be saved",
      undefined,
      {
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3500,
        panelClass: 'custom-style-error',
      }
    );
  }

  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onSubmit() {
    const uploadImageData = new FormData();
    uploadImageData.append(
      'fileName',
      this.selectedFile,
      this.selectedFile.name
    );

    this.addGameService.uploadImg(this.gameId, uploadImageData).subscribe({
      next: (val) => {
        this.successfulSubmit();
        this.router.navigate(['/game-lists']);
      },
      error: (err) => this.imageErrorDuringSubmission(),
    });
  }
}
