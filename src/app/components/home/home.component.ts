import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Game } from '../../models/game';
import { HomeService } from './home.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  game: Game = new Game();
  message: string = '';
  disableActions: boolean;
  isLoading: boolean;

  constructor(
    private homeService: HomeService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.startGame();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  startGame(): void {
    this.isLoading = true;
    this.homeService.startGame().subscribe((res: Game) => {
      this.game = res;
      this.message = res.message;
      this.disableActions = false;
      this.isLoading = false;
    }, (err) => {
      this.confirmationService.confirm({
        message: 'Se ha producido un problema al crear la partida',
        acceptVisible: false,
      });
      this.isLoading = false;
    });
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  moveHunter(): void {
    this.homeService.moveHunter(this.game).subscribe(res => {
      this.game.hunter = res.hunter;
      this.message = this.message + res.message;
      const victory = res.victory;
      const loss = res.loss;
      if (victory) {
        this.confirmationService.confirm({
          message: '¡Enhorabuena, has ganado!',
          acceptLabel: 'Nueva partida',
          accept: () => {
            this.startGame();
          },
          reject: () => {
            this.disableActions = true;
          }
        });
      } else if (loss) {
        this.confirmationService.confirm({
          message: 'Lo sentimos, has perdido :(',
          acceptLabel: 'Reintentar',
          accept: () => {
            this.startGame();
          },
          reject: () => {
            this.disableActions = true;
          }
        });
      }
    }, (err) => {
      this.confirmationService.confirm({
        message: 'Se ha producido un problema al cargar la petición',
        acceptVisible: false,
      });
    });
  }

  turnAround(direction: string): void {
    const body = {
      direction: direction,
      hunter: this.game.hunter
    };
    this.homeService.turnAround(body).subscribe(res => {
      this.game.hunter = res;
    }, (err) => {
      this.confirmationService.confirm({
        message: 'Se ha producido un problema al cargar la petición',
        acceptVisible: false,
      });
    });
  }

  isHunter(x: number, y: number): boolean {
    if (this.game.rooms[x][y].pit || this.game.rooms[x][y].wumpus) {
      return false;
    } else if (this.game.hunter.positionX == x && this.game.hunter.positionY == y) {
      return true;
    }
  }

  showRoom(x: number, y: number): boolean {
    return this.game.hunter.positionX == x && this.game.hunter.positionY == y;
  }

  showPerception(x: number, y: number): boolean {
    if (!this.game.rooms[x][y].pit && !this.game.rooms[x][y].wumpus) {
      return true;
    }
  }
}
