var app        = null;
var Cases      = new CaseStudies();
var Countries  = new CountriesCollection();
var Challenges = new ChallengesCollection();
var Case       = null;
var map        = null;
var mini_map   = null;

$(function(){

  Countries.fetch();
  Challenges.fetch();

  Cases.fetch({
    success: function(){
      app = new MainRouter();
    }
  });
});
