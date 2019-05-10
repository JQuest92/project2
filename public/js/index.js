// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

// ------------- MAPS CODE STARTS ------------------- //

$(document).ready(function() {

  var dbRestaurants = [];

  getDbRestaurants();

  function getDbRestaurants() {
    $.get("/api/restaurants", function(data) {
      dbRestaurants = data;
      console.log(data);
      console.log(dbRestaurants);
    });
  }
})


var map;
var InforObj = [];
var centerCords = { lat: 36.1627, lng: -86.7816 };

// Data for the markers
var restaurants = [
  {
    name: "Slow Burn",
    address: "x",
    latitude: 36.27877,
    longitude: -86.69017,
    phone: 615 - 615 - 6115,
    website: "x",
    facebook: "x"
  },
  {
    name: "Prince's Hot Chicken Shack",
    address: "x",
    latitude: 36.22998,
    longitude: -86.76077,
    phone: 615 - 615 - 6115,
    website: "x",
    facebook: "x"
  },
  {
    name: "Prince's Hot Chicken Shack-South",
    address: "x",
    latitude: 36.04371,
    longitude: -86.71239,
    phone: 615 - 615 - 6115,
    website: "x",
    facebook: "x"
  },
  {
    name: "Scoreboard Bar & Grill",
    address: "x",
    latitude: 36.22074,
    longitude: -86.69386,
    phone: 615 - 615 - 6115,
    website: "x",
    facebook: "x"
  },
  {
    name: "400 Degrees Hot Chicken",
    address: "x",
    latitude: 36.19855,
    longitude: -86.83752,
    phone: 615 - 615 - 6115,
    website: "x",
    facebook: "x"
  }
];

function setMarkers() {
  // add custom marker image
  var image = {
    url: "././images/chicken-32-red.ico",
    // This marker is 32 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the image at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };

  // Adds markers to the map.
  for (var i = 0; i < restaurants.length; i++) {
    // info window content
    var contentString =
      "<div id='siteNotice'>" +
      "</div>" +
      "<div id='content'>" +
      "<h5 id='firstHeading' class='firstHeading'>" +
      restaurants[i].name +
      "</h5>" +
      "<div id='bodyContent'>" +
      "<p>Address: " +
      restaurants[i].address + " " + 
      restaurants[i].city + ", " + 
      restaurants[i].state + " " + 
      restaurants[i].zip +
      "</p>" +
      "<p>Phone: " +
      restaurants[i].phone +
      "</p>" +
      "<p><a href='" +
      restaurants[i].website +
      "'>" +
      "Website</a> " +
      "<p><a href='" +
      restaurants[i].facebook +
      "'>" +
      "Facebook</a> " +
      "</div>" +
      "</div>";

    // var restaurant = restaurants[i];
    const marker = new google.maps.Marker({
      position: { lat: restaurants[i].latitude, lng: restaurants[i].longitude },
      map: map,
      icon: image,
      animation: google.maps.Animation.DROP,
      title: restaurants[i].name
    });

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400
    });

    marker.addListener("mouseover", function() {
      closeOtherInfo();
      infowindow.open(marker.get("map"), marker);
      InforObj[0] = infowindow;
    });

    // marker.addListener("mouseout", function () {
    //   closeOtherInfo();
    //  infowindow.close();
    //   InforObj[0] = infowindow;
    // });

    // // toggles map marker animation on/off
    marker.addListener("click", function() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    })
  }
}

function closeOtherInfo() {
  if (InforObj.length > 0) {
    /* detach the info-window from the marker ... undocumented in the API docs */
    InforObj[0].set("marker", null);
    /* and close it */
    InforObj[0].close();
    /* blank the array */
    InforObj.length = 0;
  }
}

// Initialize and add the map
// eslint-disable-next-line no-unused-vars
function initMap() {
  console.log("running");

  // The map, centered on Nashville
  map = new google.maps.Map(document.getElementById("map"), {
    center: centerCords,
    zoom: 11
  });

  // console.log("the map instance");
  // console.log(map);
  setMarkers();
}