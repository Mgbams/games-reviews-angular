import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RequestApiService } from '../services/request-api.service';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.css']
})
export class GameDescriptionComponent implements OnInit {

  public idGame: any;
  public response: any;
  public isLogStatus = {
    id: "",
    pseudonym: "",
    email: "",
    role: ""
  };

  public reviewGame = [{
    name: "Testtesttest",
    description : "oezufhzeiufhgzeifgzeifglzegfzegflzehfbglvichzefvczef",
    datePublication : "2020-01-01",
    score: "12"
  },
  {
  name: "Testtesttest",
  description : "oezufhzeiufhgzeifgzeifglzegfzegflzehfbglvichzefvczef",
  datePublication : "2020-01-01",
  score: "12"
  }];

  constructor(private requestApiService: RequestApiService,
    private route: ActivatedRoute,
    private auth : AuthService,
    private router: Router
    ) {
    this.idGame = Number(this.route.snapshot.paramMap.get('idGame'));

    this.requestApiService.getSingleGame(this.idGame)
      .subscribe({
        next: (value: any) => {
          this.response = value;
        },
        error: (error) => {
          this.router.navigate(['**']);
        }
             
      });
    }
    
  ngOnInit(): void {
    this.isLogStatus = this.auth.isAuthenticated();
  }

  public addReview(id: number) {
      this.router.navigate(['/add-review']);

  }

  public modifyGame(id: number) {
    console.log(id);
  }
  public deleteGame(id: number) {
    console.log(id);
  }
}
