import express from "express";
import { ReasonPhrases } from "http-status-codes";
import dbIntegration from "./db";
import { createResponse } from "./interfaces/responses";
import { getAQuote } from "./quotes";
var cors = require("cors");
var compression = require("compression");

const app = express();
app.use(cors());
app.use(compression())

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
  let userID = req.header("userID")!;
  let userName = req.header("userName")!;
  let profURL = req.header("profURL")!;
  console.log(userID);
  console.log(userName);
  let createResp = await db.createUser(userID, userName, profURL);
  if (createResp == ReasonPhrases.OK) {
    res.send(createResponse("User Created", null, createResp));
  } else if (createResp == ReasonPhrases.CONFLICT) {
    res.send(createResponse("User Already Exist", null, createResp));
  } else if (createResp == ReasonPhrases.INTERNAL_SERVER_ERROR) {
    res.send(createResponse("Internal Server Error", null, createResp));
  }
});

app.listen(3001, () => {
  console.log("listening in port 3001");
});
