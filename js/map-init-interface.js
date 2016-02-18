$(function() {

  $(document).on("click", ".btn", function(e) {
    e.preventDefault();
    var fuelType = $(this).attr("fuel-type");
    var fuelSearchUrl = 'https://data.cityofchicago.org/resource/alternative-fuel-locations.json?fuel_type_code=' + fuelType;
    $.get({
      url: fuelSearchUrl,
      dataType: 'json',
      userAgent: 'test',
      success: function(data) {
        initializeMap();

        function initializeMap() {

          var styles = [
            {
              "elementType": "geometry",
              "stylers": [
                { "hue": "#ff4400" },
                { "saturation": -68 },
                { "lightness": -4 },
                { "gamma": 0.72 }
              ]
            },{
              "featureType": "road",
              "elementType": "labels.icon"
            },{
              "featureType": "landscape.man_made",
              "elementType": "geometry",
              "stylers": [
                { "hue": "#0077ff" },
                { "gamma": 3.1 }
              ]
            },{
              "featureType": "water",
              "stylers": [
                { "hue": "#00ccff" },
                { "gamma": 0.44 },
                { "saturation": -33 }
              ]
            },{
              "featureType": "poi.park",
              "stylers": [
                { "hue": "#44ff00" },
                { "saturation": -23 }
              ]
            },{
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                { "hue": "#007fff" },
                { "gamma": 0.77 },
                { "saturation": 65 },
                { "lightness": 99 }
              ]
            },{
              "featureType": "water",
              "elementType": "labels.text.stroke",
              "stylers": [
                { "gamma": 0.11 },
                { "weight": 5.6 },
                { "saturation": 99 },
                { "hue": "#0091ff" },
                { "lightness": -86 }
              ]
            },{
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                { "lightness": -48 },
                { "hue": "#ff5e00" },
                { "gamma": 1.2 },
                { "saturation": -23 }
              ]
            },{
              "featureType": "transit",
              "elementType": "labels.text.stroke",
              "stylers": [
                { "saturation": -64 },
                { "hue": "#ff9100" },
                { "lightness": 16 },
                { "gamma": 0.47 },
                { "weight": 2.7 }
              ]
            }
          ];

          var styledMap = new google.maps.StyledMapType(styles,
            {name: "Styled Map"});

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
              icon: 'http://icons.iconarchive.com/icons/martz90/hex/32/power-icon.png',
              title: markerArray.station_name,
              mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
              }
            });
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
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
                            '<p>Address: ' + dataSet.street_address + ', ' + dataSet.city + ', ' + dataSet.state + ' ' + dataSet.zip + '</p>' +
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
});
