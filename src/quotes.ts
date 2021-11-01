import axios from "axios";

export const getAQuote = async () => {
  let resp = await axios.get("https://api.quotable.io/random");
	return resp;
};
