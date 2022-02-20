import {Review} from "./review";

export interface Page {

  content: Review[];
  empty: boolean;
  first: boolean;
  last: boolean;

  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;

}
