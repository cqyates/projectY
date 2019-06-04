// Get references to page elements
var $exampleAuthor = $('#example-author');
var $examplePassword = $('#example-password');
var $exampleTitle = $('#example-title');
var $examplePhotoURL = $('#example-photoURL');
var $exampleTags = $('#example-tags');
var $exampleZipcode = $('#example-zipcode');
var $submitBtn = $('#submit');
var $exampleList = $('#example-list');





























// The API object contains methods for each kind of request we'll make
var API = {
  // saveExample: function(example) {
  //   return $.ajax({
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     type: 'POST',
  //     url: 'api/examples',
  //     data: example
  //   });
  // },
  getExamples: function() {
    return $.ajax({
      url: 'api/examples',
      type: 'GET'
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: 'api/examples/' + id,
      type: 'DELETE'
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      console.log('are you here?');
      var $a = $('<a>')
        .text(example.author)
        .text(example.password)
        .text(example.title)
        .text(example.photoURL)
        .text(example.tags)
        .text(example.zipcode)
        .attr('href', '/example/' + example.id);

      var $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': example.id
        })
        .append($a);

      var $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     authorname: $exampleAuthor.val().trim(),
//     password: $examplePassword.val().trim(),
//     title: $exampleTitle.val().trim(),
//     // photoURL: $examplePhotoURL.val().trim(),
//     tags: $exampleTags.val().trim(),
//     zipcode: $exampleZipcode.val().trim()
//   };

// if (!(example.text && example.description)) {
//   alert("You must enter an example text and description!");
//   return;
// }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleAuthor.val('');
//   $examplePassword.val('');
//   $exampleTitle.val('');
//   $examplePhotoURL.val('');
//   $exampleTags.val('');
//   $exampleZipcode.val('');
// };

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr('data-id');

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
// $submitBtn.on('click', handleFormSubmit);
$exampleList.on('click', '.delete', handleDeleteBtnClick);
