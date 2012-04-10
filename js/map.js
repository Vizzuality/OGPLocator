var map_options = {
  zoom: 2,
  center: new google.maps.LatLng(34.397, 0),
  panControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  overviewMapControl: false,
  backgroundColor: '#B6DDEE',
  zoomControl: false
};

var mini_map_options = {
  zoom: 8,
  center: new google.maps.LatLng(34.397, 0),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  panControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  overviewMapControl: false,
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

function addMarker(map, case_study){
  latlon = case_study.getLatLong().coordinates;

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latlon[1], latlon[0]),
    map: map,
    title: case_study.get('name'),
    clickable: true,
    icon: '/OGPLocator/img/marker_single_selected.png'
  });

  google.maps.event.addDomListener(marker, 'click', function(evt) {
    infoWindow.setContent(case_study.toJSON());
    infoWindow.open(evt.latLng);
  });

  google.maps.event.addDomListener(map, 'click', function(evt) {
    infoWindow.hide();
  });
}
