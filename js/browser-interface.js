// var CDC_SECRECT_TOKEN = 'o-1Fe6wqOnHTXf6bf2eRqxpMYbNDH9KJJ4xU';
// var apiKey = 'AAwTaYawH1FutT0oPxw5KKbbH';

var markers = [];

$(function() {
  $.get({
    url: 'https://data.cityofchicago.org/resource/alternative-fuel-locations.json',
    dataType: 'json',
    userAgent: 'test',
    success: function(data) {
      //Create/Load Markers
      for (var i = 0; i <= 133; i++) {
        var myLatLng = {};
        myLatLng.lat = parseFloat(data[i].location.latitude);
        myLatLng.lng = parseFloat(data[i].location.longitude);
        markers.push(myLatLng);
      }
      console.log(myLatLng);

      function initializeMap() {
        var bounds = new google.maps.LatLngBounds();
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.6727905, lng: -88.2556},
          zoom: 9
        });

        // Info Window Content
         var infoWindowContent = [
             ['<div class="info_content">' +
             '<h3>London Eye</h3>' +
             '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
             ['<div class="info_content">' +
             '<h3>Palace of Westminster</h3>' +
             '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
             '</div>']
         ];

        // Display multiple markers on a map
        var infoWindow = new google.maps.InfoWindow({map: map});
        // var infoWindow = new google.maps.InfoWindow(), marker, i;

        // Loop through our array of markers & place each one on the map
        for( i = 0; i < markers.length; i++ ) {
            var position = new google.maps.LatLng(markers[i]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i][0]
            });
            // console.log(position);

            // // Allow each marker to have an info window
            // google.maps.event.addListener(marker, 'click', (function(marker, i) {
            //     return function() {
            //         infoWindow.setContent(infoWindowContent[i][0]);
            //         infoWindow.open(map, marker);
            //     }
            // })(marker, i));
            // Automatically center the map fitting all markers on the screen
            // map.fitBounds(bounds);
        }
      }

      initializeMap();
    }
  });

  // $.get('https://data.cityofchicago.org/resource/alternative-fuel-locations.json', function(response) {
    // console.log(response);
    // return response;
  // });
});
