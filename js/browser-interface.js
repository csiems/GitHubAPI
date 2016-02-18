var markers = [];

$(function() {
  $.get({
    url: 'https://data.cityofchicago.org/resource/alternative-fuel-locations.json',
    dataType: 'json',
    userAgent: 'test',
    success: function(data) {
      //Create Array of Lat Longs
      for (var i = 0; i <= 10; i++) {
        var myLatLng = {};
        myLatLng.lat = parseFloat(data[i].location.latitude);
        myLatLng.lng = parseFloat(data[i].location.longitude);
        myLatLng.station_name = data[i].station_name;
        myLatLng.fuel_type_code = data[i].fuel_type_code;
        myLatLng.street_address = data[i].street_address;
        myLatLng.city = data[i].city;
        myLatLng.state = data[i].state;
        myLatLng.zip = data[i].zip;

        markers.push(myLatLng);
      }
      console.log(myLatLng);

      //Initalize Map
      function initializeMap() {
        var bounds = new google.maps.LatLngBounds();
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.6727905, lng: -88.2556},
          zoom: 9
        });

        // Loop through our array of Lat Longs & create a marker on the map
        for( i = 0; i < markers.length; i++ ) {
          createMarker(markers[i]);
        }

        function createMarker(markerArray) {
          var position = new google.maps.LatLng(markerArray);
          var contentString = '<div class="content">' +
                                '<h1>' + markerArray.station_name + '</h1>' +
                                '<h4>Fuel Type: ' + markerArray.fuel_type_code + '</h3>' +
                                '<p>Address: ' + markerArray.street_address + ', ' + markerArray.city + ', ' + markerArray.state + ' ' + markerArray.zip + '</p>' +
                              '</div>';
          var newMarker = new google.maps.Marker({
            position: position,
            map: map,
            title: markerArray.station_name
          });
          var newInfoWindow = new google.maps.InfoWindow({
            content: contentString
          });

          newMarker.addListener('click', function() {
            newInfoWindow.open(map, newMarker);
          });

          bounds.extend(position);
        }



      }

      initializeMap();
    }
  });
});
