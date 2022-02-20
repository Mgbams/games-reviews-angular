export interface Review {

  id: number;
  score: number;
  description: string;
  game: Game;
  player: User;
  publicationDateTime: Date;
  moderator: User;
  moderationDateTime: Date;
  validated: boolean;

}

interface Game {

  id: number;
  name: string;

}

interface User {

  id: number;
  pseudonym?: string;

}
