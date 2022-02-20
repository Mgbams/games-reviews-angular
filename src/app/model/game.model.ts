import { Classification } from "./classification.model";
import { Genre } from "./genre.model";
import { BusinessModel } from "./model_business.model";
import { Moderator } from "./moderator.model";
import { Platform } from "./platform.model";
import { Publisher } from "./publisher.model";

export interface Game {
  id: number;
  picture: string;
  name: string;
  publisher: Publisher;
  genre: Genre;
  platform: Platform;
  businessModel: BusinessModel;
  classification: Classification;
  moderator: Moderator;
}



