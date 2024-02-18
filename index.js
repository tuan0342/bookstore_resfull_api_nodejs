const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const authorRoute = require("./routes/author");
const bookRouter = require("./routes/book");

const app = express();

// CONNECT TO DB
const db = require("./db/index");
db.connect();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

// ROUTES
app.use("/v1/author", authorRoute);
app.use("/v1/book", bookRouter);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
