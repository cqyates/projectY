var db = require("../models");
var keys = require("../keys");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Profile.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/map", function(req, res) {
    res.render("map");
  });

  app.get("/form", function(req, res) {
    db.Profile.findAll({}).then(function(dbExamples) {
      res.render("form", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Profile.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
