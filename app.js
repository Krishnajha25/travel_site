require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
var path = require('path')
var cors = require("cors")
var bodyParser = require("body-parser")

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use("/api/users", userRouter);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
