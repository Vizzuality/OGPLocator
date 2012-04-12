L.TileLayer.MapsChart = L.TileLayer.extend({
  
  initialize: function(options) {
    //options = {
    //    waterColor:"#B6DDEE",
    //    terrainColor: "#D7EDF6",
    //    countriesIsoCodes: ["SV","CD","GT","HN","MD","ML","ZM"],
    //    countriesValues: [1,1,1,1,1,1,1],
    //    colorGradient:["#415E9E","#BC3939"],
    //    minValue:0,
    //    maxValue:1
    //}    
    
    L.Util.setOptions(this, options || {});
  },
  
    
  onAdd: function(map, insertAtTheBottom) {
      L.TileLayer.prototype.onAdd.call(this, map, insertAtTheBottom);
  },
  
  onRemove: function(map) {
    L.TileLayer.prototype.onRemove.call(this, map);
  },
  
  getTileUrl: function(xy, z) {
      var lULP = new L.Point(xy.x*256,(xy.y+1)*256);
      var lLRP = new L.Point((xy.x+1)*256,xy.y*256);     
      var projectionMap = new MercatorProjection();
      var lULg = projectionMap.fromDivPixelToLatLng(lULP, z);
      var lLRg = projectionMap.fromDivPixelToLatLng(lLRP, z);         
      
      var countries = this.options.countriesIsoCodes.join("|");
      var colorGradient = this.options.colorGradient.join().replace(/#/gi,"");
      
      var data =extendedEncode(this.options.countriesValues,this.options.maxValue);
      var limits = this.options.minValue+","+this.options.maxValue;
      
      var baseUrl= "http://chart.apis.google.com/chart?chs=256x256&chd=" +data+ "&chco="+ this.options.terrainColor.replace("#","") + "," + colorGradient + "&chld="+ countries+ "&chf=a,s,"+ this.options.waterColor.replace("#","") + "|bg,s,00000000&chds="+ limits;
      
      var bbox="&cht=map:fixed=" + lULg.lat +","+ lULg.lng + "," + lLRg.lat + "," + lLRg.lng;
      return baseUrl+bbox;
		
  } 
});

L.TileLayer.MapsChart._callbackId = 0;

// This function scales the submitted values so that
// maxVal becomes the highest value.
var EXTENDED_MAP=
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
var EXTENDED_MAP_LENGTH = EXTENDED_MAP.length;
function extendedEncode(arrVals, maxVal) {
  var chartData = 'e:';

  for(i = 0, len = arrVals.length; i < len; i++) {
    // In case the array vals were translated to strings.
    var numericVal = new Number(arrVals[i]);
    // Scale the value to maxVal.
    var scaledVal = Math.floor(EXTENDED_MAP_LENGTH *
        EXTENDED_MAP_LENGTH * numericVal / maxVal);

    if(scaledVal > (EXTENDED_MAP_LENGTH * EXTENDED_MAP_LENGTH) - 1) {
      chartData += "..";
    } else if (scaledVal < 0) {
      chartData += '__';
    } else {
      // Calculate first and second digits and add them to the output.
      var quotient = Math.floor(scaledVal / EXTENDED_MAP_LENGTH);
      var remainder = scaledVal - EXTENDED_MAP_LENGTH * quotient;
      chartData += EXTENDED_MAP.charAt(quotient) + EXTENDED_MAP.charAt(remainder);
    }
  }

  return chartData;
}
