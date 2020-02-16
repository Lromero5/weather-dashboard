$(document).ready(function(){

   //new code 
    var allcities = [];

    displaysearchhistory()
  
   // This function handles events where a movie button is clicked
   $("#findcity").on("click", function(event) {
      event.preventDefault();
      
      //will display the information we are calling from the api
      displaycityinfo()

    var whatWasSearched = $("#city-form").val();
    var newcity = $("#city-form").val().trim();

    var pastcities = localStorage.getItem("cityhistory");

    if (pastcities) {
        var parsedcities = JSON.parse(pastcities);
        parsedcities.push(newcity);
        var strCities = JSON.stringify(parsedcities);
        localStorage.setItem("cityhistory", strCities) 
    } else {
        allcities.push(newcity);
        var strCities = JSON.stringify(allcities);
        localStorage.setItem("cityhistory", strCities)   
    }
    displaysearchhistory()

 

      getfiveday(whatWasSearched)

      $(".forecast").empty();

   });

   function displaysearchhistory(){

      $(".cities").empty();
      var citiestodisplay = JSON.parse(localStorage.getItem("cityhistory"));
     
      if (citiestodisplay){
        for (i = 0; i < citiestodisplay.length; i++){
            var newitem = $("<li>");
            newitem.text(citiestodisplay[i]);
            $(".cities").prepend(newitem);
       }

      }


   }

    function displaycityinfo(){
        var citysearched = $("#city-form").val();
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citysearched + "&appid=e93830c367b80844fd42a32b98ed8cb9&units=imperial"
    
            $.ajax({
                url: queryURL,
                method: "GET"
              }).then(function(response) {
                  console.log(response)
                // $(".display").text(JSON.stringify(response.list[0].main.temp));
                 var cityname = $("<h2>").text(response.city.name + " " + moment(response.list[0].dt_txt.split(" ") [0]).format('l'));
                 var currenttemp = $("<h4>").text("Temperature: " + response.list[0].main.temp + " Degrees F");
                 var currenthumidity = $("<h4>").text("Humidity: " + response.list[0].main.humidity + "%");
                 var currentwindspeed = $("<h4>").text("Wind Speed: " + response.list[0].wind.speed + "MPH");
                 

                 $(".display").empty()
                 
                 $(".display").append(cityname, currenttemp ,currenthumidity, currentwindspeed);


              });
    } 


    function getfiveday(searchcity){

          $.ajax({
              url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchcity + "&appid=e93830c367b80844fd42a32b98ed8cb9&units=imperial"
          }).then(function(data){
              console.log(data)
      
              for (var i = 0; i < data.list.length; i++){
                  if (data.list[i].dt_txt.split(" ") [1] === "03:00:00"){
                      var divE = $("<div>").addClass("card col-md-2") 
                      var date = $("<p>").text("Date: " + moment(data.list[i].dt_txt.split(" ") [0]).format('l'));
                      var imgtag = $("<img>").attr("src", "https://clipartstation.com/wp-content/uploads/2018/10/weather-clipart-2.jpg").addClass("weatherpic");
                      var temp = $("<p>").text("Temperature: " + data.list[i].main.temp);
                      var humidity = $("<p>").text("Humidty: " +data.list[i].main.humidity);
                    
                      divE.append(date, imgtag, temp, humidity);
                      $(".forecast").append(divE);
                  }
              }
          })
      
      }



//end of newcode
// end of document.ready
})    



