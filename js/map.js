var map_options = {
  zoom: 2,
  panControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  overviewMapControl: false,
  backgroundColor: '#B6DDEE',
  zoomControl: false
};

var infoWindow = null;

function CustomZoomControl(map){
  var controlDiv = document.createElement('div');
  controlDiv.className = 'custom-zoom';

  var controlZoomIn = document.createElement('div');
  controlZoomIn.className = 'in';
  controlDiv.appendChild(controlZoomIn);

  var controlZoomOut = document.createElement('div');
  controlZoomOut.className = 'out';
  controlDiv.appendChild(controlZoomOut);

  google.maps.event.addDomListener(controlZoomIn, 'click', function() {
    map.setZoom(map.getZoom() + 1);
  });

  google.maps.event.addDomListener(controlZoomOut, 'click', function() {
    map.setZoom(map.getZoom() - 1);
  });

  return controlDiv;
}

function setMapPolygons(map, cases){

  var selectedCountries = _.map(cases, function(model){
    return model.toJSON().country_iso.toUpperCase();
  });

  console.log(selectedCountries);
  var style = "#ogp_countries {polygon-fill:#D0EAF5;polygon-opacity: 1;line-opacity:0;line-color: #FFFFFF;";

  _.each(selectedCountries, function(value) {
    style += '[iso_a2="' + value + '"]{polygon-fill:#FFF;line-opacity:0.4;line-color: #000;}';
  });

  style += "}";

    cartodb_leaflet = new L.CartoDBLayer({
      map_canvas:     'map',
      map:            map,
      user_name:      'ogp',
      table_name:     'ogp_countries',
      tile_style:     style,
      infowindow:     false,
      query:          'SELECT * FROM {{table_name}}',
      auto_bound:     false,
      debug:          false
    });
}

var OGPIcon = L.Icon.extend({
  iconUrl: '/OGPLocator/img/marker_single_selected.png',
  shadowUrl: null,
  iconSize: new L.Point(19, 19),
  iconAnchor: new L.Point(9, 9)
});

function addMarker(map, case_study){
  var icon = new OGPIcon();
  var latlon = case_study.getLatLong().coordinates;
  var marker = new L.Marker(new L.LatLng(latlon[1], latlon[0]), {icon: icon});

  map.addLayer(marker);
  marker.bindPopup(ich.infobox(case_study.toJSON()).html());

  //var marker = new google.maps.Marker({
    //position: new google.maps.LatLng(latlon[1], latlon[0]),
    //map: map,
    //title: case_study.get('name'),
    //clickable: true,
    //icon: '/OGPLocator/img/marker_single_selected.png'
  //});

  //google.maps.event.addDomListener(marker, 'click', function(evt) {
    //infoWindow.setContent(case_study.toJSON());
    //infoWindow.open(evt.latLng);
  //});

  //google.maps.event.addDomListener(map, 'click', function(evt) {
    //infoWindow.hide();
  //});

  //return marker;
}
