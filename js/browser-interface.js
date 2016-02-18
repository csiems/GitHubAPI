$(function() {
  $.get({
    url: 'https://data.cityofchicago.org/resource/alternative-fuel-locations.json',
    dataType: 'json',
    userAgent: 'test',
    success: function(data) {
      initializeMap();
      function initializeMap() {
        var bounds = new google.maps.LatLngBounds();
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.894812, lng: -87.605089},
          zoom: 9
        });

        for( i = 0; i < data.length; i++ ) {
          createMarker(data[i]);
        }

        function createMarker(markerArray) {
          var newPosition = createMarkerPosition(markerArray);
          var contentString = createWindowContent(markerArray);
          var newMarker = new google.maps.Marker({
            position: newPosition,
            map: map,
            title: markerArray.station_name
          });
          var newInfoWindow = new google.maps.InfoWindow({
            content: contentString
          });
          addListenerToWindow(newMarker, newInfoWindow);
          bounds.extend(newPosition);
        }

        function createMarkerPosition(dataSet) {
          var myLatLng = {};
          myLatLng.lat = parseFloat(dataSet.location.latitude);
          myLatLng.lng = parseFloat(dataSet.location.longitude);
          return new google.maps.LatLng(myLatLng);
        }

        function createWindowContent(dataSet) {
          var string = '<div class="content">' +
                          '<h1>' + dataSet.station_name + '</h1>' +
                          '<h4>Fuel Type: ' + dataSet.fuel_type_code + '</h3>' +
                          '<p>Address: ' + dataSet.street_address + ', ' + dataSet.city + ', ' + data.state + ' ' + data.zip + '</p>' +
                        '</div>';
          return string;
        }

        function addListenerToWindow(target, window) {
          target.addListener('click', function() {
            if (!target.open) {
              window.open(map, target);
              target.open = true;
            } else {
              window.close();
              target.open = false;
            }
            google.maps.event.addListener(map, 'click', function() {
              window.close();
              target.open = false;
            });
          });
        }

      }

    }
  });
});
