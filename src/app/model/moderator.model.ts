import { User } from "./user.model";

export interface Moderator extends User {
  phone_number?: string;
}

