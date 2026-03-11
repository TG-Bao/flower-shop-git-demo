var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");

// Set up views and view engine
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

// Static files
app.use(express.static(__dirname + "/public"));

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  }),
);

// Route index
var controller = require(__dirname + "/apps/controllers");
app.use(controller);

var server = app.listen(3000, function () {
  console.log("server is running at http://localhost:3000");
});
