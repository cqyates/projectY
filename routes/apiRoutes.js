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
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Profile.findAll({}).then(function(dbExamples) {
      res.render("example", { user: dbExamples });
    });
  });

  app.get("/upload", function(req, res) {
    res.render("upload");
  });

  app.post("/api/location", (req, res) => {
    console.log(req.body)
  });

  app.post("/api/examples", upload.single("file"), function(req, res, next) {
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

  //Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Profile.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });

};
