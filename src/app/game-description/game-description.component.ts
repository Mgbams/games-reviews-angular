import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AddGameService } from '../services/add-game.service';
import { AuthService } from '../services/auth.service';
import { RequestApiService } from '../services/request-api.service';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.css'],
})
export class GameDescriptionComponent implements OnInit {
  serverImgUrl = 'http://localhost:8080/images/';
  public idGame: any;
  public response: any;
  public isLogStatus = {
    id: '',
    pseudonym: '',
    email: '',
    role: '',
  };

  public reviewGame = [
    {
      name: 'Testtesttest',
      description: 'oezufhzeiufhgzeifgzeifglzegfzegflzehfbglvichzefvczef',
      datePublication: '2020-01-01',
      score: '12',
    },
    {
      name: 'Testtesttest',
      description: 'oezufhzeiufhgzeifgzeifglzegfzegflzehfbglvichzefvczef',
      datePublication: '2020-01-01',
      score: '12',
    },
  ];

  constructor(
    private requestApiService: RequestApiService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private notification: MatSnackBar,
    private dialogService: DialogService,
    private homePageService: AddGameService,
  ) {
    this.idGame = Number(this.route.snapshot.paramMap.get('idGame'));

    this.requestApiService.getSingleGame(this.idGame).subscribe({
      next: (value: any) => {
        this.response = value;
      },
      error: (error) => {
        this.router.navigate(['**']);
      },
    });
  }

  ngOnInit(): void {
    this.isLogStatus = this.auth.isAuthenticated();
  }

  public addReview(id: number) {
    // this.router.navigate(['add-review', this.idGame]);
    this.router.navigate(['/add-review']);
  }

  public modifyGame(id: number) {
    console.log(id);
  }
  public deleteGame(id: number) {
    console.log(id);
      // cancelling registration

    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this game?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.homePageService.deleteGame(id).subscribe({
            next: () => {
              //this.openOnDeleteRequest();
              this.successfulDeletion();
              this.router.navigate(['/']);
            },
            error: () => this.errorDuringDeletion(),
          });
        } else {
          return;
        }
      });
  
  }
  successfulDeletion() {
    this.notification.open(`Game successfully deleted!`, undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style',
    });
  }

  errorDuringDeletion() {
    this.notification.open("Game couldn't be deleted", undefined, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 2500,
      panelClass: 'custom-style-error',
    });
  }
}
