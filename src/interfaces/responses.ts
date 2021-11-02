import { ReasonPhrases } from "http-status-codes";

export interface ICreateUser {
  message: string;
  code: ReasonPhrases;
}
