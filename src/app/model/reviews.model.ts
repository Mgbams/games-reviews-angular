export interface Review {
  id: number;
  description: string;
  moderationDate: Date;
  publicationDate: Date;
  score: number;
  gameId: number;
  moderatorId: number;
  playerId: number;
  image: string;
  name: string;
  publisher: string;
}
