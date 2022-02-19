import { User } from './user.model';

export interface Player extends User {
  birth_date: Date;
}
