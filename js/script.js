var app               = null;
var Cases             = new CaseStudies();
var Countries         = new CountriesCollection();
var Challenges        = new ChallengesCollection();
var Topics            = new TopicsCollection();
var Categories        = new CategoriesCollection();
var Case              = null;

var uri_regexp  = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/gi;
var mail_regexp = /[0-9a-zA-Z]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+/gi;

var disqus_shortname = 'ogpdemo';
var disqus_url = null;
var disqus_developer = 1;
//var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
//dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
//(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

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
