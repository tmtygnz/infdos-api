import express from "express";
import dbIntegration from "./db";
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
	console.log(userID);
  let response = await db.createUser(userID.toString(), userName.toString());
  res.send(response);
});

app.listen(3001, () => {
  console.log("listening in port 3001");
});
