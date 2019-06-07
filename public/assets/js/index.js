console.log("Hello?");
// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

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




//   method: "GET"
// }).then(function(response) {
//   console.log(response)
// });

// $.getJSON(flickerAPI, {
//   tags: "historical",
//   tagmode: "any",
//   format: "json"
//   })
//   .done(function(result) {
//     $.each(result.items, function(i, item) {
//       console.log("this is a test");
//       $("<img>")
//         .attr("src", item.media.m)
//         .appendTo("#flickrData");
//       if (i === 5) {
//         return false;
//       }
//     });
//   })
//   .fail(function(xhr, status, error) {
//     alert(
//       "Result: " +
//         status +
//         " " +
//         error +
//         " " +
//         xhr.status +
//         " " +
//         xhr.statusText
//     );
//   });

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
