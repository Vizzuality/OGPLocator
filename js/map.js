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

function setMapPolygons(map, cases){
  var mapChartLayer = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      var lULP = new google.maps.Point(coord.x*256,(coord.y+1)*256);
      var lLRP = new google.maps.Point((coord.x+1)*256,coord.y*256);
      var projectionMap = new MercatorProjection();
      var lULg = projectionMap.fromDivPixelToLatLng(lULP, zoom);
      var lLRg = projectionMap.fromDivPixelToLatLng(lLRP, zoom);
      var countries = _.map(cases, function(model){
        return model.toJSON().country_iso.toUpperCase();
      }).join('|');
      var data = _.map(cases, function(model){
        return '1';
      }).join(',');
      var limits = "0,1";
      var selected_color = "";
      var baseUrl="http://chart.apis.google.com/chart?chs=256x256&chd=t:"+data+"&chco=D0EAF5,FFFFB2,FFFFFF&chld="+countries+"&chf=a,s,B6DDEE|bg,s,00000000&chds="+limits;
      var bbox="&cht=map:fixed=" + lULg.lat() +","+ lULg.lng() + "," + lLRg.lat() + "," + lLRg.lng();
      return baseUrl+bbox;
    },
    tileSize: new google.maps.Size(256, 256),
    isPng: true,
    maxZoom: 18,
    name: "GMC",
    alt: "Google Map Chart"
  });

  map.mapTypes.set('gmc', mapChartLayer);
  map.setMapTypeId('gmc');
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

  return marker;
}
