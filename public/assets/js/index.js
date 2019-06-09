console.log("Hello?");
// Get references to page elements

//getJSON call to flickr API. Tried sticking this in pace of the ajax example given, but it did not work.
$(document).ready(function() {
  $("#reset").click(function(e) {
    location.reload();
  });

  $("#searchButton").click(function(e) {
    $("#outputDiv").html("");

    var flickerAPI =
      "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" +
      $("#search").val();
    $.ajax({
      url: flickerAPI,
      dataType: "jsonp", // jsonp
      jsonpCallback: "jsonFlickrFeed", // add this property
      success: function(result, status, xhr) {
        $.each(result.items, function(i, item) {
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


// refreshExamples gets new examples from the db and repopulates the list


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list


// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list


// Add event listeners to the submit and delete buttons


