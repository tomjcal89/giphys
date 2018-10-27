
//array of person
var topics = ["oprah", "luke bryan", "simon cowell", "melissa mcarthy", "jennifer aniston", "bradly cooper", "ellen degenerous", "beyonce", "steph curry", "the rock"];
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
    var personURL = response.data[i].images.fixed_height.url;
    var stillImg = response.data[i].images.fixed_width_still.url;
   //creating div for the gif
    var gifDiv = $("<div class='col-lg-4 col-sm-6'>");
   
   //creating an image tag to place the gif in
    var personImage = $("<img>").attr("src", stillImg);
    

    personImage.addClass("image")

    //creating a paragraph tag to place the rating in and putting it on the page
    var p = $("<p>").text("Rating: " + rating)
    
    //taking the image tag and putting the image of thge gif in it
    personImage.attr("data-state", "still");
    personImage.attr("data-animate", personURL);
    personImage.attr("data-still", stillImg);
    

    //if the image doesnt populate, "person Image" will take place on the page
    personImage.attr("alt", "person Image");

    //appending the gifDiv to the page with both the paragraph and the image
    gifDiv.append(p, personImage);

    //selecting the div in which the image will pupulate on the page
    $("#appearGif").prepend(gifDiv)
  };
  
}); 
};

//creatting buttons
function renderButtons(){
  
  //emptying the buttons
  $("#personButton").empty();
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
  $("#personButton").append(button);
  }
};
//creating a funciton to create a button when pressing on the add button on screen
$("#add").on("click", function(event){
  event.preventDefault();
//
  var addperson = $("#input").val().trim();
  topics.push(addperson)
  renderButtons()

  
});

//creating animate function

function gifAnimate() {
	var current = $(this).attr("data-state");
	var still = $(this).attr("data-still");
	var animate = $(this).attr("data-animate");

	if (current === "still") {
		$(this).attr("src", animate);
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", still);
		$(this).attr("data-state", "still");
	}
}


//pushing elements to the screen
$(document).on("click", ".topicsButton", displayInfo)
$(document).on("click", ".image", gifAnimate)

renderButtons()
    