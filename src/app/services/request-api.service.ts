import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

  public fakeReponse = [{
    name : "test",
    description : "lieufhglkjqgfbdlkzhegfblkjhsdgbfljzehvbflshfvblzjevfljzhvfljerhbvfljhrvefljhzvfjhvzejfhvsljhfvzjhefhjzebvf",
    img: "../../asset/zelda.jpg"
  }];

  constructor(private http: HttpClient) { }


  public getSingleGame(id: number): Observable<any> {
    return this.http.get("URL_A_ECRIRE_POUR_CONNECTER-LE_BACK" + id);
  }
}
