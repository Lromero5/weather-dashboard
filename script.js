$(document).ready(function(){

   //new code 
    var allcities = [" "];
  
   // This function handles events where a movie button is clicked
   $("#findcity").on("click", function(event) {
      event.preventDefault();
      
      //will display the information we are calling from the api
      displaycityinfo()

      var whatWasSearched = $("#city-form").val();
      var newitem = $("<li>");
      newitem.text(whatWasSearched);
      $(".cities").prepend(newitem)

      getfiveday(whatWasSearched)

      $(".forecast").empty();

   });


    function displaycityinfo(){
        var citysearched = $("#city-form").val();
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citysearched + "&appid=e93830c367b80844fd42a32b98ed8cb9&units=imperial"
    
            $.ajax({
                url: queryURL,
                method: "GET"
              }).then(function(response) {
                  console.log(response)
                // $(".display").text(JSON.stringify(response.list[0].main.temp));
                 var currenttemp = $("<h1>").text("current temp: " + response.list[0].main.temp);
                 var currenthumidity = $("<h1>").text("current humidity: " + response.list[0].main.humidity);
                 var currentwindspeed = $("<h1>").text("current wind speed: " + response.list[0].wind.speed);
                 

                 $(".display").empty()
                 
                 $(".display").append(currenttemp ,currenthumidity, currentwindspeed);
    
        // This line grabs the input from the textbox
        var newcity = $("#city-form").val().trim();

        allcities.push(newcity);

              });
    } 


    function getfiveday(searchcity){

          $.ajax({
              url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchcity + "&appid=e93830c367b80844fd42a32b98ed8cb9&units=imperial"
          }).then(function(data){
              console.log(data)
      
              for (var i = 0; i < data.list.length; i++){
                  if (data.list[i].dt_txt.split(" ") [1] === "03:00:00"){
                      console.log("single day", data.list[i])
                      var divE = $("<div>").addClass("card col-md-2") 
                      var date = $("<p>").text("Date: " + data.list[i].dt_txt.split(" ") [0])
                      var temp = $("<p>").text("Temperature: " + data.list[i].main.temp)
                      var humidity = $("<p>").text("Humidty" +data.list[i].main.humidity);
                    
                      divE.append(date, temp, humidity);
                      $(".forecast").append(divE);
                  }
              }
          })
      
      }



//end of newcode
// end of document.ready
})    



