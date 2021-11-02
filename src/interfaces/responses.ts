import { ReasonPhrases } from "http-status-codes";

export interface IResponse {
  message: string;
  data: any;
  status: ReasonPhrases;
}

export const createResponse = (
  message: string,
  data: any,
  status: ReasonPhrases
) => {
  let resp: IResponse = {
    message: message,
    data: data,
    status: status,
  };
	return resp;
};
