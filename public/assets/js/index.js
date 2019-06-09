console.log("This is Index.JS?");
//getJSON call to flickr API. Tried sticking this in pace of the ajax example given, but it did not work.
$(document).ready(function() {
  $("#reset").click(function(e) {
    location.reload();
  });

  $("#searchButton").click(function(e) {
    $("#outputDiv").html("");
    var query = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1c9f777eb7446f34a7261dc1a54be4b2&lat=${37.8651}&lon=${119.5383}&format=json`;

    //await - undefined 

    //farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    // https: //api.flickr.com/services/rest/?method=flickr.photos.geo.photosForLocation&api_key=1c9f777eb7446f34a7261dc1a54be4b2&lat=40.6700&lon=73.9400&format=json&nojsoncallback=1&auth_token=72157638668602974-e1a3a3aa1e6d3dd8&api_sig=a0233b016c863b1662aeb21a664c351a
    // http: var flickerAPI = `https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=1c9f777eb7446f34a7261dc1a54be4b2&lat=37.8651&lon=119.5383&format=json&jsoncallback=?`;
    $.ajax({
      url: query,
      dataType: "jsonp", // jsonp
      jsonpCallback: "jsonFlickrFeed", // add this property
      success: function(result, status, xhr) {
        $.each(result.items, function(i, item) 
        var result.photos.photo.id[i]
        // result.id
        
        {
          $("<img>")
            .attr("src", item.media.m)
            .appendTo("#outputDiv");
          if (i === 5) {
            return false;
          }
        });
      },
      error: function(xhr, status, error) {
        console.log(xhr);
        $("#outputDiv").html(
          "Result: " +
            status +
            " " +
            error +
            " " +
            xhr.status +
            " " +
            xhr.statusText
        );
      }
    });
  });
});

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
  // getExamples: function() {
  //   return $.ajax({
  //     url: flickerAPI,
  //     method: "GET"
  //   }).then(function(response) {
  //     console.log(response);
  //   });
  // },
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

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
