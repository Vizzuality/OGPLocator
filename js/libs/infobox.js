function InfoWindow(params) {
  this.latlng_ = new google.maps.LatLng(0,0);
  this.template = params.template;
  this.map_ = params.map;
  this.columns_;
  this.offsetHorizontal_ = -107;
  this.width_ = 210;
  this.setMap(params.map);
  this.params_ = params;
};


InfoWindow.prototype = new google.maps.OverlayView();

InfoWindow.prototype.draw = function() {
  var that = this;

  var div = this.div_;
  if (!div) {
    div = this.div_ = document.createElement('DIV');
    div.className = "infowindow";

    div.innerHTML = this.template;

    this.bindClose();

    google.maps.event.addDomListener(div, 'click', function (ev) {
      //ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
    });

    google.maps.event.addDomListener(div, 'dblclick', function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
    });
    google.maps.event.addDomListener(div, 'mousedown', function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
      ev.stopPropagation ? ev.stopPropagation() : window.event.cancelBubble = true;
    });
    google.maps.event.addDomListener(div, 'mouseup', function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
    });
    google.maps.event.addDomListener(div, 'mousewheel', function (ev) {
      ev.stopPropagation ? ev.stopPropagation() : window.event.cancelBubble = true;
    });
    google.maps.event.addDomListener(div, 'DOMMouseScroll', function (ev) {
      ev.stopPropagation ? ev.stopPropagation() : window.event.cancelBubble = true;
    });

    var panes = this.getPanes();
    panes.floatPane.appendChild(div);
    div.style.opacity = 0;
  }
};

InfoWindow.prototype.setPosition = function() {
  if (this.div_) {
    var div = this.div_;
    var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (pixPosition) {
      div.style.width = this.width_ + 'px';
      div.style.left = (pixPosition.x - 122) + 'px';
      var actual_height = - $(div).outerHeight();
      div.style.top = (pixPosition.y + actual_height - 15) + 'px';
      console.log(div.style.top);
    }
    this.show();
  }
}

InfoWindow.prototype.bindClose = function(){
  var that = this;
  $(this.div_).find('.close').click(function(ev){
    ev.preventDefault();
    ev.stopPropagation();
    that.hide();
  });
}

InfoWindow.prototype.setContent = function(case_study){
  this.div_.innerHTML = ich.infobox(case_study).html();
  this.bindClose();
}

InfoWindow.prototype.setSolutionURL = function(title, url){
  $(this.div_).find(".solutions li a").html(title);
  $(this.div_).find(".solutions li a").attr("href", url);
}

InfoWindow.prototype.setCallback = function(callback){
  $(".btn").on('click', callback);
}

InfoWindow.prototype.open = function(latlng){
  var that = this;
  that.latlng_ = latlng;
  that.moveMaptoOpen();
  that.setPosition();
}


InfoWindow.prototype.hide = function() {
  if (this.div_) {
    var div = this.div_;
    $(div).animate({
      top: '+=' + 10 + 'px',
      opacity: 0},
      100, 'swing',
      function () {
        div.style.visibility = "hidden";
      }
    );
  }
}


InfoWindow.prototype.show = function() {
  if (this.div_) {
    this.div_.style.opacity = 0;
    $(this.div_).animate({
      top: '-=' + 10 + 'px',
      opacity: 1},
      250
    );
    this.div_.style.visibility = "visible";
  }
}


InfoWindow.prototype.isVisible = function(marker_id) {
  if (this.div_) {
    var div = this.div_;
    if (div.style.visibility == 'visible') {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}


InfoWindow.prototype.moveMaptoOpen = function() {
  var left = 0;
  var top = 0;
  var div = this.div_;
  var pixPosition = this.getProjection().fromLatLngToContainerPixel(this.latlng_);

  if ((pixPosition.x + 230) >= ($('#map').width())) {
    left = (pixPosition.x + 230 - $('#map').width());
  }

  if ((pixPosition.y - $(this.div_).find(".box").height()) < 200) {
    top = (pixPosition.y - $(this.div_).find(".box").height() - 130);
  }

  this.map_.panBy(left,top);
}
