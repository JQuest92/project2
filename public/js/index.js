// ------------- MAPS CODE STARTS ------------------- //

  
var dbRestaurants = [];

var map;
var InforObj = [];
var centerCords = { lat: 36.1627, lng: -86.7816 };


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
  for (var i = 0; i < dbRestaurants.length; i++) {
    // info window content
    var contentString =
      "<div id='siteNotice'>" +
      "</div>" +
      "<div id='content'>" +
      "<h5 id='firstHeading' class='firstHeading'>" +
      dbRestaurants[i].name +
      "</h5>" +
      "<div id='bodyContent'>" +
      "<p>Address: " +
      dbRestaurants[i].address + " " + 
      dbRestaurants[i].city + ", " + 
      dbRestaurants[i].state + " " + 
      dbRestaurants[i].zip +
      "</p>" +
      "<p>" +
      dbRestaurants[i].phone +
      " | <a class='info-window' href=" +
      dbRestaurants[i].website +
      ">" +
      "Website</a>" +
      " | <a class='info-window' href=" +
      dbRestaurants[i].facebook +
      ">" +
      "Facebook</a></p>" +
      "</div>" +
      "</div>";

    const marker = new google.maps.Marker({
      position: { lat: parseFloat(dbRestaurants[i].latitude), lng: parseFloat(dbRestaurants[i].longitude) },
      map: map,
      icon: image,
      animation: google.maps.Animation.DROP,
      title: dbRestaurants[i].name
    });

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400
    });

    marker.addListener("click", function() {
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

  $.get("/api/restaurants", function(data) {
    dbRestaurants = data;
    console.log(data);


    // The map, centered on Nashville
    map = new google.maps.Map(document.getElementById("map"), {
      center: centerCords,
      zoom: 10
    });

  // console.log("the map instance");
  // console.log(map);
  setMarkers();
});

}