var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.restaurant.findAll({}).then(function(dbRestaurants) {
      res.render("index", {
        msg: "Welcome!",
        restaurant: dbRestaurants
      });
    });
  });

  // Load index page
  app.get("/user", function(req, res) {
    // Here you need code to get user
    res.render("user");
  });

  app.get("/example", function(req, res) {
    res.render("example");
  });
  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
