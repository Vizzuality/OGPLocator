var app      = null;
var Cases    = new CaseStudies();
var Case     = null;
var map      = null;
var mini_map = null;

$(function(){
  Cases.fetch({
    success: function(){
      app = new MainRouter();
    }
  });
});
