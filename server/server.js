var express = require("express");
var path = require("path");
var db = require("./config/connection");
// const routes = require("./routes");
var app = express();
var PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
// app.use(routes);
db.once("open", function () {
  app.listen(PORT, function () {
    return console.log("Listening on Port: ".concat(PORT));
  });
});
