var map_options = {
  zoom: 3,
  center: new google.maps.LatLng(34.397, 0),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  panControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  overviewMapControl: false,
  zoomControl: false,
  styles: [
   {
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
  ]
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

  return controlDiv;
}

function addMarker(latlon){
  latlon = latlon.coordinates;

  new google.maps.Marker({
    position: new google.maps.LatLng(latlon[1], latlon[0]),
    map: map,
    title: 'My workplace',
    clickable: true,
    icon: '/OGPLocator/img/marker_single_unselected.png'
  });
}
