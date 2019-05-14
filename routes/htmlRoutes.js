var db = require("../models");


var path = require("path");


var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Restaurant.findAll({}).then(function(dbRestaurants) {
      res.render("index", {
        msg: "Welcome!",
        restaurant: dbRestaurants
      });
    });
  });


  app.get("/user", function(req, res) {
    res.render("user");
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

};
