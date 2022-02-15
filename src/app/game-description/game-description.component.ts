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

  constructor(private requestApiService: RequestApiService,
    private route: ActivatedRoute) {
    this.idGame = this.route.snapshot.paramMap.get('idGame');
    this.requestApiService.getSingleGame(this.idGame)
      .subscribe((value: any) => {

        // this.response = value;
        this.response = this.requestApiService.fakeReponse;
      });
  }

  ngOnInit(): void {
  }

}
