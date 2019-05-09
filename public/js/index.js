// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// ------------- MAPS CODE STARTS ------------------- //

var dbRestaurants = [];

getDbRestaurants();

function getDbRestaurants() {
  $.get("/api/restaurants", function(data) {
    dbRestaurants = data;
    console.log(dbRestaurants);
  });
}

// Initialize and add the map
// eslint-disable-next-line no-unused-vars
function initMap() {
  console.log("running");

  // The location of Uluru
  var uluru = { lat: 36.1627, lng: -86.7816 };
  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById("map"), {
    center: uluru,
    zoom: 11
  });

  console.log("the map instance");
  console.log(map);
  google.maps.event.trigger(map, "resize");

  setMarkers(map);
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var restaurants = [
  ["Slow Burn", 36.27877, -86.69017],
  ["Prince's Hot Chicken Shack", 36.22998, -86.76077],
  ["Prince's Hot Chicken Shack-South", 36.04371, -86.71239],
  ["Scoreboard Bar & grill", 36.22074, -86.69386],
  ["400 Degrees Hot Chicken", 36.19855, -86.83752]
];

function setMarkers(map) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  var image = {
    url: "././images/chicken-32-red.ico",
    // This marker is 32 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the image at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };

  for (var i = 0; i < restaurants.length; i++) {
    var restaurant = restaurants[i];
    var marker = new google.maps.Marker({
      position: { lat: restaurant[1], lng: restaurant[2] },
      map: map,
      icon: image,
      animation: google.maps.Animation.DROP,
      title: restaurant[0]
    });
  }

  var contentString =
    // eslint-disable-next-line prettier/prettier
    "<div id=\"content\">" +
    // eslint-disable-next-line prettier/prettier
    "<div id=\"siteNotice\">" +
    "</div>" +
    // eslint-disable-next-line prettier/prettier
    "<h1 id=\"firstHeading\" class=\"firstHeading\">Uluru</h1>" +
    // eslint-disable-next-line prettier/prettier
    "<div id=\"bodyContent\">" +
    "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    // eslint-disable-next-line prettier/prettier
    "<p>Attribution: Uluru, <a href=\"https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194\">" +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  // click event listener to initiate bounce animation
  marker.addListener("click", toggleBounce, showInfoWindow);

  // toggles map marker animation on/off
  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  // toggle
  function showInfoWindow() {
    infowindow.open(map, marker);
  }
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
