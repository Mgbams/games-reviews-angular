import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../model/player.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly BASE_URL = environment.url;

  constructor(private httpClient: HttpClient) { }

  public postPlayer(player: Player): Observable<Player> {
    return this.httpClient.post<Player>(`${this.BASE_URL.playerSignUpUrl}`, player);
  }
}
