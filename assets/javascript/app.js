
//array of food
var topics = ["ramen", "pizza", "hamburger", "fried chicken", "steak", "chips", "french fries", "apple", "cheese", "chocolate"];
//displaying info onto the page
function displayInfo() {
//naming the url
var topicArr = $(this).attr("data-name");
console.log(this)
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
topicArr + "&api_key=FyTBOceE4j4aegNLriIXtUgc4JFMQWzG&limit=10";
//calling the ajax function
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response)
  

  //looping through the api to get the rating and image for each gif
  for(var i = 0; i < response.data.length; i++){

    //setting a variable for the rating for the gif
    var rating = response.data[i].rating

    //setting a variable for the image of the gif
    var foodURL = response.data[i].images.fixed_height.url;

   //creating div for the gif
    var gifDiv = $("<div>")
   
   //creating an image tag to place the gif in
    var foodImage = $("<img>");

    //creating a paragraph tag to place the rating in and putting it on the page
    var p = $("<p>").text("Rating: " + rating)
    
    //taking the image tag and putting the image of thge gif in it
    foodImage.attr("src", foodURL);

    //if the image doesnt populate, "Food Image" will take place on the page
    foodImage.attr("alt", "Food Image");

    //appending the gifDiv to the page with both the paragraph and the image
    gifDiv.append(p, foodImage);

    //selecting the div in which the image will pupulate on the page
    $("#appearGif").prepend(gifDiv)
  };
  
}); 
};

//creatting buttons
function renderButtons(){
  
  //emptying the buttons
  $("#foodButton").empty();
//looping through the topics
  for(i = 0; i < topics.length; i++){
    //dynamically creating a button
  var button = $("<button>");
    // creating a class for the buttons
  button.addClass("topicsButton");
  //setting the data name attribute to the button with each index of the array
  button.attr("data-name", topics[i]);
  //giving each button a name of each string in the array
  button.text(topics[i]);
  //appending the button to the screen
  $("#foodButton").append(button);
  }
};
//creating a funciton to create a button when pressing on the add button on screen
$("#add").on("click", function(event){
  event.preventDefault();
//
  var addFood = $("#input").val().trim();
  topics.push(addFood)
  renderButtons()

  
});
//pushing elements to the screen
$(document).on("click", ".topicsButton", displayInfo)
renderButtons()
    