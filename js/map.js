var map_options = {
  zoom: 2,
  center: new google.maps.LatLng(34.397, 0),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  panControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  overviewMapControl: false,
  zoomControl: false,
  styles: blueMap()
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
  zoomControl: false,
  styles: blueMap()

};

function blueMap(){
  return [{
    featureType: "administrative",
      stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "water",
      elementType: "labels",
      stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "poi",
      stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "water",
      stylers: [
      { hue: "#00b2ff" },
      { lightness: 30 },
      { saturation: 31 },
      { gamma: 0.96 }
    ]
  },{
    featureType: "landscape",
    stylers: [
    { saturation: 56 },
    { lightness: -5 },
    { gamma: 0.86 },
    { hue: "#00b2ff" }
    ]
  },{
    featureType: "road",
    stylers: [
    { visibility: "off" }
    ]
  }
  ];
}

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

function addMarker(latlon){
  latlon = latlon.coordinates;

  new google.maps.Marker({
    position: new google.maps.LatLng(latlon[1], latlon[0]),
    map: map,
    title: 'My workplace',
    clickable: true,
    icon: '/OGPLocator/img/marker_single_selected.png'
  });
}

function setPolygon(coords){
  coords = coords.coordinates;
  var paths = [];

  $.each(coords, function (i, n) {
    $.each(n, function (j, o) {
      var path = [];
      $.each(o, function (k, p) {
        var ll = new google.maps.LatLng(p[1], p[0]);
        path.push(ll);
      });
      paths.push(path);
    });
  });

  var polygon = new google.maps.Polygon({
    map: map,
    paths: paths,
    strokeColor: '#009933',
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: 'rgba(255, 255, 255, 0.6)',
    fillOpacity: 0.25
  });

  map.fitBounds(polygon.getBounds());

}

if (!google.maps.Polygon.prototype.getBounds) {
  google.maps.Polygon.prototype.getBounds = function() {
    var bounds = new google.maps.LatLngBounds();
    var paths = this.getPaths();
    var path;
    for (var p = 0; p < paths.getLength(); p++) {
      path = paths.getAt(p);
      for (var i = 0; i < path.getLength(); i++) {
        bounds.extend(path.getAt(i));
      }
    }
    return bounds;
  }
}
