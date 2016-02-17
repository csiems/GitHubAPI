var KEY = "e0aa4703629c3d46bd310eee601b23ff";
var timeZoneKey = "VENSNMLOSFPU";
var timeZone;
$(function() {

  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $('.showWeather').text("Weather for " + city + ":");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + KEY, function(response) {
      $('.showWeather').text("The humidity in " + city + " is " + response.main.humidity + "%");

      $.get('http://api.timezonedb.com/?lat=' + response.coord.lat + '&lng=' + response.coord.lon + '&format=json&key=' + timeZoneKey, function(tz) {
        console.log(tz.zoneName);
        timeZone=tz.zoneName;
      });
    });
    // console.log(resp);


  });
});

 exports.timeZone = timeZone;
