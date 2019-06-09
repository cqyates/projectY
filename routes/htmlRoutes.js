var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("map");
  });

  app.get("/login", function(req, res) {
    console.log("login route working");
    res.render("login");
  });

  app.get("/form", function(req, res) {
    console.log("this is the form route");
    res.render("form");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Profile.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
