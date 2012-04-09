var app               = null;
var Cases             = new CaseStudies();
var Countries         = new CountriesCollection();
var CountriesWithGeom = new CountriesWithGeomCollection();
var Challenges        = new ChallengesCollection();
var Topics            = new TopicsCollection();
var Categories        = new CategoriesCollection();
var Case              = null;

$(function(){

  CountriesWithGeom.fetch({success: function(){
    Countries.fetch();
    Challenges.fetch();
    Topics.fetch();
    Categories.fetch();

    Cases.fetch({
      success: function(){
        app = new MainRouter();
      }
    });
  }});
});
