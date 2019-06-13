var db = require("../models");
var multer = require("multer");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/assets/img");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + ".jpg");
  }
});

var upload = multer({ storage: storage });

module.exports = function(app) {
  app.get("/useruploads", function(req, res) {
    db.Details.findAll({}).then(function(dbExamples) {
      res.render("useruploads", { user: dbExamples });
    });
  });

  app.get("/upload", function(req, res) {
    res.render("upload");
  });

  app.post("/form", upload.single("file"), function(req, res, next) {
    const filePath = `/assets/img/${req.file.filename}`;
    var formBody = {
      title: req.body.title,
      photoURL: filePath,
      tags: req.body.tags,
      zipcode: req.body.zipcode
    };
    db.Details.create(formBody).then(function(dbExample) {
      console.log("saved to database");
      res.redirect("/");
    });
  });

  app.post("/login", function(req, res) {
    console.log(req.body.username);
    var loginBody = {
      username: req.body.username,
      password: req.body.password
    };
    db.Profile.create(loginBody).then(function(dbExample) {
      res.redirect("/form");
    });
  });
};
