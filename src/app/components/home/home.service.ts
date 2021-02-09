import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Room } from '../../models/room';
import { Game } from '../../models/game';
import { Hunter } from '../../models/hunter';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  startGame(): Promise<Game> {
    return this.http.get<Game>('https://1x7zwhr4mg.execute-api.eu-central-1.amazonaws.com/dev/').toPromise();
  }

  getGamesResult(): Promise<any> {
    return this.http.get<any>('https://1x7zwhr4mg.execute-api.eu-central-1.amazonaws.com/dev/games-result').toPromise();
  }

  moveHunter(game: Game): Promise<any> {
    return this.http.post<any>('https://1x7zwhr4mg.execute-api.eu-central-1.amazonaws.com/dev/make-movement', game).toPromise();
  }

  turnAround(body: any): Promise<any> {
    return this.http.post<any>('https://1x7zwhr4mg.execute-api.eu-central-1.amazonaws.com/dev/turn-around', body).toPromise();
  }
}
