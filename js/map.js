var map_options = {
  zoom: 3,
  center: new google.maps.LatLng(34.397, 0),
  mapTypeId: google.maps.MapTypeId.TERRAIN,
  panControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  overviewMapControl: false,
  zoomControl: false
};

var mini_map_options = {
  zoom: 8,
  center: new google.maps.LatLng(34.397, 0),
  mapTypeId: google.maps.MapTypeId.TERRAIN,
  panControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  overviewMapControl: false,
  zoomControl: false
};

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

  console.log(controlDiv);
  return controlDiv;
}
