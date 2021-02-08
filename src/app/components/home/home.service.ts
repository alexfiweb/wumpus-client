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

  startGame(): Observable<Game> {
    return this.http.get<Game>('https://1x7zwhr4mg.execute-api.eu-central-1.amazonaws.com/dev/');
  }

  moveHunter(game: Game): Observable<any> {
    return this.http.post<any>('https://1x7zwhr4mg.execute-api.eu-central-1.amazonaws.com/dev/make-movement', game);
  }

  turnAround(body: any): Observable<any> {
    return this.http.post<any>('https://1x7zwhr4mg.execute-api.eu-central-1.amazonaws.com/dev/turn-around', body);
  }
}
