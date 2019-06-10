var marker;
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
  $('#reset').click(function(e) {
    location.reload();
  });
 // FIXME change this search button location.
  $('#searchButton').click(function(e) {
    $('#outputDiv').html('');
    var query = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1c9f777eb7446f34a7261dc1a54be4b2&lat=${lat}&lon=${lon}&format=json`;
    //await - undefined
    //farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    $.ajax({
      url: query,
      method: 'GET'
    }).then(function(response) {
      var resInfo = response.photos.photo.id[i];
      console.log(resInfo);
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
  map.panTo(latLng);
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}

var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
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
        infoWindow.setContent('You are Here!');
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
    map.addListener('click', function(e) {
      placeMarkerAndPanTo(e.latLng, map);
      getMarkerLocation(marker);
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

$(document).ready(function() {
  $('#reset').click(function(e) {
    location.reload();
  });
  console.log('This is Index.js');
  $('#searchButton').click(function(e) {
    $('#outputDiv').html('');
    var query =
      'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1c9f777eb7446f34a7261dc1a54be4b2&lat=32.1155&lon=-81.2471&format=json';
    //await - undefined
    //farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    $.ajax({
      url: query,
      method: 'GET'
    }).then(function(response) {
      var resInfo = response.photos.photo.id[i];
      console.log(resInfo);
    });
    //     success: function(result, status, xhr) {
    //       $.each(result.items, function(i, item)
    //       // var result.photos.photo.id[i]
    //       // result.id

    //       {
    //         $("<img>")
    //           .attr("src", item.media.m)
    //           .appendTo("#outputDiv");
    //         if (i === 5) {
    //           return false;
    //         }
    //       });
    //     },
    //     error: function(xhr, status, error) {
    //       console.log(xhr);
    //       $("#outputDiv").html(
    //         "Result: " +
    //           status +
    //           " " +
    //           error +
    //           " " +
    //           xhr.status +
    //           " " +
    //           xhr.statusText
    //       );
    //     }
    //   });
    // });
  });
});
