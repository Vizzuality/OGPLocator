var map_options = {
  zoom: 2,
  center: new L.LatLng(55, 0),
  minZoom:1,
  panControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  overviewMapControl: false,
  backgroundColor: '#B6DDEE',
  zoomControl: false
};

var infoWindow = null
  , cartodb_leaflet;

function CustomZoomControl(map){
  var controlDiv = document.createElement('div');
  controlDiv.className = 'custom-zoom';

  var controlZoomIn = document.createElement('div');
  controlZoomIn.className = 'in';
  controlDiv.appendChild(controlZoomIn);

  var controlZoomOut = document.createElement('div');
  controlZoomOut.className = 'out';
  controlDiv.appendChild(controlZoomOut);

  return controlDiv;
}

function setMapPolygons(map, cases){

  var selectedCountries = _.map(cases, function(model){
    return model.toJSON().country_iso.toUpperCase();
  });

  var style = "#ogp_countries {";

  _.each(selectedCountries, function(value) {
    style += '[iso_a2="' + value + '"]{polygon-fill:#FFF;line-opacity:1;line-color:#CDCDCD;}';
  });

  style += "}";

  if (!cartodb_leaflet) {
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
    map.addLayer(cartodb_leaflet);
  } else {
    cartodb_leaflet.setStyle(style);
  }
  
}

var OGPIcon = L.Icon.extend({
  iconUrl: '/OGPLocator/img/marker_single_selected.png',
  shadowUrl: null,
  iconSize: new L.Point(19, 19),
  iconAnchor: new L.Point(9, 9),
  popupAnchor: new L.Point(1, 10)
});

function addMarker(map, case_study){
  var icon = new OGPIcon();
  var latlon = case_study.getLatLong().coordinates;
  var marker = new L.Marker(new L.LatLng(latlon[1], latlon[0]), {icon: icon});

  map.addLayer(marker);
  marker.bindPopup(ich.infobox(case_study.toJSON()).html());

  return marker;
}
