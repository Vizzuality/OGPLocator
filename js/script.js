var app               = null;
var Cases             = new CaseStudies();
var Countries         = new CountriesCollection();
var CountriesWithGeom = new CountriesWithGeomCollection();
var Challenges        = new ChallengesCollection();
var Case              = null;
var map               = null;
var mini_map          = null;

$(function(){

  CountriesWithGeom.fetch({success: function(){
    Countries.fetch();
    Challenges.fetch();

    Cases.fetch({
      success: function(){
        app = new MainRouter();
      }
    });
  }});
});
