const dotenv = require("dotenv");
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const app = express();
app.use(express.json());

app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const postRouter = require("./routes/post");
app.use("/posts", postRouter);
app.get("/", (req, res) => res.redirect("/posts"));

const DB = "mongodb://localhost:27017";
mongoose.connect(DB).then(() => {
  console.log("DB connection sucessfull");
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ports ${port}`);
});
