
//array of movies

var topics = ["jurassic park", "finding nemo", "mean girs", "titanic", "transformers", "black panther", "avengers", "love simon", "spider man", "coco"]

function renderButtons() {
    $("#movieButton").empty();

    for (var i = 0; i < topics.length; i++){

  var button = $("<button>");
  button.addClass("topics");
  button.attr(topics[i]);
  button.text(topics[i]);
  $("#movieButton").append(button)
    };
};

//adding a button with inputing a name and pressing the add button.
$("#add").on("click", function(event){
  event.preventDefault();

  var addMovie = $("#input").val().trim();
  topics.push(addMovie)
  renderButtons()


  
});
renderButtons()


$("#movieButton").on("click", function (){ 

//api link
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
topics + "&api_key=FyTBOceE4j4aegNLriIXtUgc4JFMQWzG";

//getting the infomraiton from the api 
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for(var j = 0; j < response.data.length; j ++){
    
    console.log(response.data[j].images.original.url);

    var movieURL = response.data[j].images.original.url;
    
    var movieImage = $("<img>");

    movieImage.attr("src", movieURL);
    movieImage.attr("alt", "movie Image");

    $("#movieButton").prepend(movieImage)

    };
  });


  
  
  
  





  
});



  
  //looping through the given array and adding a button to the screen when it loads
  
  
  
  
  
  