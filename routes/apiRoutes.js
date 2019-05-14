var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/");
  });
  //

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });



  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Get all restaurants

  app.get("/api/restaurants", function(req, res) {
    db.Restaurant.findAll().then(function(dbRestaurants) {
      res.json(dbRestaurants);
    });
  });

  // Post all visits

  app.post("/api/visited", function(req, res) {
    console.log(
      "\n\n\n\n\n\n\n\nMade it!\n---------\n" +
        req.body.restaurantName +
        "\n\n\n\n\n"
    );
    db.Visit.create({
      restaurantName: req.body.restaurantName,
      userName: req.body.userName
    }).then(function(dbVisited) {
      res.json(dbVisited);
    });
  });

  //get all visits

  app.get("/api/visited", function(req, res) {
    db.Visit.findAll({}).then(function(dbVisited) { 
      res.json(dbVisited);
    });
  });
};
