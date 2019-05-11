$(document).ready(function() {
  var $list = $("#restaurantList");

  $.ajax({
    url: "/api/restaurants",
    method: "GET"
  }).then(function(dbRestaurants) {
    for (var i = 0; i < dbRestaurants.length; i++) {
      var restaurantId = dbRestaurants[i].id;
      var elem =
        "<li>" +
        "<h3>" +
        dbRestaurants[i].name +
        "</h3>" +
        "<p>" +
        dbRestaurants[i].address +
        " " +
        dbRestaurants[i].city +
        " " +
        dbRestaurants[i].state +
        " " +
        dbRestaurants[i].zip +
        "</p>";
      $list.append(elem);

      var butt = $("<button/>", {
        text: "visit",
        id: dbRestaurants[i].id,

        click: function(event) {
          event.preventDefault();
          console.log("IM CLICKING!");
          $.ajax({
            url: "/api/user_data",
            method: "GET"
          }).then(function(dbUser) {
            console.log(butt.id);
            console.log(butt);
            var visited = {
              restaurantName: this.class,
              userName: dbUser.id
            };

            $.post("api/visited", visited);
          });
        } //END CLICK HANDLER
      }); //END JQUERY BUTTON
      /////////////////////////////////
      $list.append(butt);
    } //end for
    console.log(dbRestaurants[0].id);
  }); //end ajax call to restaurants api

  /*$("<ul>").on("click", function(event){
    event.preventDefault();
    console.log("IM CLICKING!")
    $.ajax({
        url: "/api/user_data",
        method: "GET"

    }).then(function(dbUser){
        console.log(this);
        var visited = {
            restaurantName: this.val(),
            userName: dbUser.id
        };
    
        $.post("api/visited", visited);

    });

});*/
}); //end doc.ready
