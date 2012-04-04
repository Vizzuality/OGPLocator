var app   = null;
var Cases = new CaseStudies();
var Case  = null;

$(function(){
  Cases.fetch({
    success: function(){
      app = new MainRouter();
    }
  });
});
