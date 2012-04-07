var app      = null;
var Cases    = new CaseStudies();
var Case     = null;
var map      = null;
var mini_map = null;

var map_options = {
  zoom: 3,
  center: new google.maps.LatLng(34.397, 0),
  mapTypeId: google.maps.MapTypeId.TERRAIN,
  panControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  overviewMapControl: false,
  zoomControlOptions: {
    position: google.maps.ControlPosition.RIGHT_TOP
  }
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

$(function(){
  Cases.fetch({
    success: function(){
      app = new MainRouter();
    }
  });
});
