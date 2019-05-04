// Initialize and add the map
function initMap() {
// The location of Uluru
  var uluru = {lat: 36.1627, lng:-86.7816};
  // The map, centered at Uluru
  var map = new google.maps.Map(
    document.getElementById('map'), {zoom: 12, center: uluru});
  // The marker, positioned at Uluru
  console.log(google.maps.Marker);
  var marker1 = new google.maps.Marker({position: {lat: 36.229980, lng:-86.760770}, map: map});
  var marker2 = new google.maps.Marker({position: {lat: 36.152962, lng:-86.797653}, map: map});
  var marker3 = new google.maps.Marker({position: {lat: 36.173990, lng:-86.761350}, map: map});
  var marker4 = new google.maps.Marker({position: {lat: 36.188599, lng:-86.746696}, map: map});
  var marker5 = new google.maps.Marker({position: {lat: 36.149870, lng:-86.779480}, map: map});
}