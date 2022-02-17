export interface Game {
  id: number;
  picture: string;
  name: string;
  publisher: string;
  genre: Genre;
}

interface Genre {
  id: number;
  name: string;
}
