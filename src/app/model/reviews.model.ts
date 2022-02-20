import { Game } from "./game.model";
import { Moderator } from "./moderator.model";
import { Player } from "./player.model";

export interface Review {
  id?: number;
  description: string;
  moderation_date_time?: Date;
  publication_date_time?: Date;
  score: number;
  game: Game;
  moderator_id?: Moderator;
  player_id: Player;
}
