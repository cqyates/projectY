var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/login", function(req, res) {
    console.log("login route working");
    res.render("login");
  });

  app.get("/form", function(req, res) {
    console.log("this is the form route");
    res.render("form");
  });

  app.get("/picresults", function(req, res) {
    res.render("picresults");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
