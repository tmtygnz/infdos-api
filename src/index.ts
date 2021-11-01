import express from "express";
import { getAQuote } from "./quotes";
var cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.redirect("https://github.com/jostimian/infdos");
});

app.get("/quote", async (req, res) => {
  console.log("/quote");
  let quote = await getAQuote();
  res.send(quote.data);
});

app.listen(3001, () => {
  console.log("listening in port 3001");
});
