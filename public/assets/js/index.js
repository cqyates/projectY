// console.log("This is Index.JS?");
//getJSON call to flickr API. Tried sticking this in pace of the ajax example given, but it did not work.

// console.log(window);

// function success(pos) {
//   var crd = pos.coords;

//   console.log("Your current position is:");
//   // console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

// var lat = "";
// var lon = "";

// $(document).ready(function() {
//   $("#reset").click(function(e) {
//     location.reload();
//   });
//   console.log("This is Index.js");
//   $("#searchButton").click(function(e) {
//     $("#outputDiv").html("");
//     var query = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1c9f777eb7446f34a7261dc1a54be4b2&lat=${37.8651}&lon=${119.5383}&format=json`;

//     //await - undefined 

//     //farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
//     // https: //api.flickr.com/services/rest/?method=flickr.photos.geo.photosForLocation&api_key=1c9f777eb7446f34a7261dc1a54be4b2&lat=40.6700&lon=73.9400&format=json&nojsoncallback=1&auth_token=72157638668602974-e1a3a3aa1e6d3dd8&api_sig=a0233b016c863b1662aeb21a664c351a
//     // http: var flickerAPI = `https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=1c9f777eb7446f34a7261dc1a54be4b2&lat=37.8651&lon=119.5383&format=json&jsoncallback=?`;
//     $.ajax({
//       url: query,
//       dataType: "jsonp", // jsonp
//       jsonpCallback: "jsonFlickrFeed", // add this property
//       success: function(result, status, xhr) {
//         $.each(result.items, function(i, item) 
//         // var result.photos.photo.id[i]
//         // result.id
        
//         {
//           $("<img>")
//             .attr("src", item.media.m)
//             .appendTo("#outputDiv");
//           if (i === 5) {
//             return false;
//           }
//         });
//       },
//       error: function(xhr, status, error) {
//         console.log(xhr);
//         $("#outputDiv").html(
//           "Result: " +
//             status +
//             " " +
//             error +
//             " " +
//             xhr.status +
//             " " +
//             xhr.statusText
//         );
//       }
//     });
//   });
// });
