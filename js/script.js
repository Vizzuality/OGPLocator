var app               = null;
var Cases             = new CaseStudies();
var Countries         = new CountriesCollection();
var Challenges        = new ChallengesCollection();
var Topics            = new TopicsCollection();
var Categories        = new CategoriesCollection();
var Case              = null;

$(function(){
  Countries.fetch();
  Challenges.fetch();
  Topics.fetch();
  Categories.fetch();

  Cases.fetch({
    success: function(){
      app = new MainRouter();
    }
  });
});
