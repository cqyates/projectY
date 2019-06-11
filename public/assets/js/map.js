var map;
var infoWindow;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  
  var lat = crd.latitude;
  var lon = crd.longitude;
  var accuracy = crd.accuracy;
  
  $("#reset").click(function(e) {
    location.reload();
  });
  
  $("#searchButton").click(function(e) {
    $("#outputDiv").html("");
    var query = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1c9f777eb7446f34a7261dc1a54be4b2&lat=${lat}&lon=${lon}&per_page=10&format=json&nojsoncallback=1`;
    $.ajax({
      url: query,
      method: "GET"
    }).then(function(data) {
      console.log(data.photos.photo[0]);
      for (var i = 0; i < data.photos.photo.length; i++) {
        var farm = data.photos.photo[i].farm;
        var server = data.photos.photo[i].server;
        var id = data.photos.photo[i].id;
        var secret = data.photos.photo[i].secret;
        var imageUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        $('#images').append($('<img src="'+imageUrl+'"/>'));
      }
    });
  });
  
  return crd;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

function placeMarkerAndPanTo(latLng, map) {
  marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  ap.panTo(latLng);
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("<button id='searchButton'>Submit</button>");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

