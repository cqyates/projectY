console.log("This is Index.JS?");
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