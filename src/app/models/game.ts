import { Hunter } from "./hunter";
import { Room } from "./room";

export class Game {
  hunter: Hunter;
  rooms: Room[][];
  message: string;
  victory: boolean;
  loss: boolean;
}
