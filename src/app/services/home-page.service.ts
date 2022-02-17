import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../model/game.model';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private readonly BASE_URL = environment.baseUrl;
  
  constructor(private httpClient: HttpClient) { }
  
  public getGames(): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL}`);
  }

}
