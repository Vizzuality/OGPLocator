var app      = null;
var Cases    = new CaseStudies();
var Case     = null;
var map      = null;
var mini_map = null;

var map_options = {
  zoom: 3,
  center: new google.maps.LatLng(34.397, 0),
  mapTypeId: google.maps.MapTypeId.TERRAIN
};

var mini_map_options = {
  zoom: 8,
  center: new google.maps.LatLng(34.397, 0),
  mapTypeId: google.maps.MapTypeId.TERRAIN
};

$(function(){
  Cases.fetch({
    success: function(){
      app = new MainRouter();
    }
  });
});
