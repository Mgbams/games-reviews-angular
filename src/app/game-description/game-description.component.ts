import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestApiService } from '../services/request-api.service';

@Component({
  selector: 'app-game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.css']
})
export class GameDescriptionComponent implements OnInit {

  public idGame: any;
  public response: any;
  public isLogStatus = "";
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
    private route: ActivatedRoute) {
    this.idGame = this.route.snapshot.paramMap.get('idGame');

    this.requestApiService.getSingleGame(this.idGame)
      .subscribe((value: any) => {
        this.response = value;
        console.log(value);
      });
      
    }
    
    ngOnInit(): void {
      this.isLogStatus = "Player"
    }

  public addReview(id: number) {
    console.log(id);
  }

  public modifyGame(id: number) {
    console.log(id);
  }
  public deleteGame(id: number) {
    console.log(id);
  }
}
