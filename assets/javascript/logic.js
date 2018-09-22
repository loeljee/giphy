$(document).ready(function(){

    var topics = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bently", "BMW", "Cadillac", "Chevrolet", "Dodge", "Ferrari", "Fiat", "Ford", "GMC", "Honda", "Infiniti", "Jaguar", "Jeep", "Lamborghini", "Lancia", "Lexus", "Mazda", "Mercedes-Benz", "Mitsubishi", "Nissan", "Pontiac", "Porsche", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"]; 

    function displayImg(){
        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 20;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&random=&api_key=dc6zaTOxFJmzC";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {
            for(var j = 0; j < limit; j++) {    
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("fixed_height_downsampled");
                image.attr("class", "gif");
                displayDiv.append(image);
                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)
                $("#display-images").append(displayDiv);
            }
        });
    }

    function renderButtons(){ 
        $("#display-buttons").empty();
        for (var i = 0; i < topics.length; i++){
            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", topics[i]); 
            newButton.text(topics[i]); 
            $("#display-buttons").append(newButton); 
        }
    }

    function imageChangeState() {          
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }
        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#submitPress").on("click", function(){
        var input = $("#user-input").val().trim();
        form.reset();
        topics.push(input);   
        renderButtons();
        return false;
    })

    renderButtons();
    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});