
//array of movies

var topics = ["ramen", "pizza", "hamburger", "fried chicken", "hot dogs", "chips", "french fries", "apple", "cheese", "chocolate"];

function displayInfo() {

var topicArr = $(this).attr("data-name");
console.log(this)
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
topicArr + "&api_key=FyTBOceE4j4aegNLriIXtUgc4JFMQWzG&limit=10";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response)
  for(var i = 0; i < response.data.length; i ++){
  var rating = response.data[i].rating
    var movieURL = response.data[i].images.original.url;
    var gifDiv = $("<div>")
    var movieImage = $("<img>");
    var p = $("<p>").text("Rating: " + rating)
    

    movieImage.attr("src", movieURL);
    movieImage.attr("alt", "movie Image");

    
    gifDiv.append(p, movieImage);

    $("#appearGif").prepend(gifDiv)
  };
}); 
};

function renderButtons(){
  
  $("#movieButton").empty();

  for(i = 0; i < topics.length; i++){

  var button = $("<button>");

  button.addClass("topicsButton");
  button.attr("data-name", topics[i]);
  button.text(topics[i]);
  $("#movieButton").append(button);
  }
};

$("#add").on("click", function(event){
  event.preventDefault();

  var addMovie = $("#input").val().trim();
  topics.push(addMovie)
  renderButtons()

  
});

$(document).on("click", ".topicsButton", displayInfo)
renderButtons()
    