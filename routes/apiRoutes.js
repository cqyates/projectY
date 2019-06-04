var db = require('../models');
var multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/assets/img');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '.jpg');
  }
});

var upload = multer({ storage: storage });

module.exports = function(app) {
  // Get all examples
  app.get('/api/examples', function(req, res) {
    db.Profile.findAll({}).then(function(dbExamples) {
      res.render('example', { user: dbExamples });
    });
  });

  app.get('/upload', function(req, res) {
    res.render('upload');
  });

  app.post('/api/examples', upload.single('file'), (req, res, next) => {
    const filePath = `/assets/img/${req.file.filename}`;
    var formBody = {
      authorname: req.body.authorname,
      password: req.body.password,
      title: req.body.title,
      photoURL: filePath,
      tags: req.body.tags,
      zipcode: req.body.zipcode
    };
    db.Profile.create(formBody).then(function(dbExample) {
      console.log('saved to database');
      res.redirect('/');
    });
  });

<<<<<<< HEAD
  //Delete an example by id
  app.delete('/api/examples/:id', function(req, res) {
    db.Profile.destroy({ where: { id: req.params.id } }).then(function(
=======
  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
>>>>>>> master
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
