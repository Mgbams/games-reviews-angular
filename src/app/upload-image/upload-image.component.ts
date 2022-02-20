import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddGameService } from '../services/add-game.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit {
  //Trial attributes for file upload
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message = '';
  imageName: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private addGameService: AddGameService,
    private notification: MatSnackBar
  ) {}

  ngOnInit(): void {}

  successfulSubmit() {
    this.notification.open(`Image successfully submitted`, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
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
        duration: 2500,
        panelClass: 'custom-style-error',
      }
    );
  }

  /*
   * Uploading image logic
   *Gets called when the user selects an image
   */
  public onFileChanged(event: any) {
    this.selectedFile = event.target?.files[0];
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

  onSubmit() {

    this.addGameService.uploadImg(this.id, this. uploadedImage()).subscribe({
      next: () => {
        this.successfulSubmit();
      },
      error: () => this.imageErrorDuringSubmission(),
    });
  }
}
