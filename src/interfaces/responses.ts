import { ReasonPhrases } from "http-status-codes";

export interface IResponse {
  message: string;
	data: any;
  status: ReasonPhrases;
}
