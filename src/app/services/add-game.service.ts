import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../model/genre.model';
import { Game } from '../model/game.model';
import { Classification } from '../model/classification.model';
import { Platform } from '../model/platform.model';
import { BusinessModel } from '../model/model_business.model';
import { Publisher } from '../model/publisher.model';

@Injectable({
  providedIn: 'root',
})
export class AddGameService {
  private readonly BASE_URL = environment.url;

  private headers = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  });
  private options = { headers: this.headers };

  constructor(private httpClient: HttpClient) {}

  public getGames(): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL.gameBaseUrl}`);
  }

  public getClassifications(): Observable<Classification[]> {
    return this.httpClient.get<Classification[]>(
      `${this.BASE_URL.classificationBaseUrl}`
    );
  }

  public getGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(`${this.BASE_URL.genreBaseUrl}`);
  }

  public getPlatforms(): Observable<Platform[]> {
    return this.httpClient.get<Platform[]>(`${this.BASE_URL.platformBaseUrl}`);
  }

  public getPublishers(): Observable<Publisher[]> {
    return this.httpClient.get<Publisher[]>(
      `${this.BASE_URL.publisherBaseUrl}`
    );
  }

  public getBusinessModel(): Observable<BusinessModel[]> {
    return this.httpClient.get<Platform[]>(
      `${this.BASE_URL.businessModelBaseUrl}`
    );
  }

  public postGame(game: Game): Observable<Game> {
    return this.httpClient.post<Game>(`${this.BASE_URL.gameBaseUrl}`, game);
  }

  public postGameImage(gameImage: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.BASE_URL.saveGameImageUrl}`,
      gameImage
    );
  }

  public getPageableGames(page: number, size: number): Observable<any> {
    return this.httpClient.get(`${this.BASE_URL.pageableGameBaseUrl}?page=${page}&size=${size}`);
  }

  // TO DO
  public deleteGame(id: number) {
    return this.httpClient.delete(`${this.BASE_URL.gameBaseUrl}/${id}`);
  }
}
