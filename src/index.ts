import express from "express";
import { ReasonPhrases } from "http-status-codes";
import dbIntegration from "./db";
import { ICreateUser } from "./interfaces/responses";
import { getAQuote } from "./quotes";
var cors = require("cors");

const app = express();
app.use(cors());

const db = new dbIntegration();

app.get("/", (req, res) => {
  res.redirect("https://github.com/jostimian/infdos");
});

app.get("/quote", async (req, res) => {
  console.log("/quote");
  let quote = await getAQuote();
  res.send(quote.data);
});

app.post("/users/create", async (req, res) => {
  let userID = req.query.userID!;
  let userName = req.query.userName!;
  let createResp = await db.createUser(userID.toString(), userName.toString());
  let response: ICreateUser = {
    message: "",
    code: createResp,
  };
  if (createResp == ReasonPhrases.OK) {
    response.message = "User Created";
  } else if (createResp == ReasonPhrases.CONFLICT) {
    response.message = "User Already Exist";
  } else if (createResp == ReasonPhrases.INTERNAL_SERVER_ERROR) {
    response.message = "There is an error in the our server.";
  }
	res.send(response);
});

app.listen(3001, () => {
  console.log("listening in port 3001");
});
