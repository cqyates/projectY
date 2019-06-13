##Images of the World

Full Stack Project with Express and Handlebars.

Our project is a full stack web application that uses google maps and flickr to create an interactive world of images.  When the user starts on our map page we get their geolocation from the browser and feeds the latitude and longitude to the flickr ajax call and brings up a selection of pictures for their current location.  
We used sequelize to create a mysql database where multer is used to save the users images to our database and then bring them up when you click on the users pictures.
