var app       = null;
var Cases     = new CaseStudies();
var Countries = new CountriesCollection();
var Case      = null;
var map       = null;
var mini_map  = null;

$(function(){
  Countries.fetch({
    success: function(){
      var countries_list = $('.filters.countries').find('ul');
      _.each(Countries.models, function(country){
        countries_list.append(ich.countries_list_item({url: 'countries/' + country.get('cartodb_id'), name: country.get('name')}));
      });
    }
  });

  Cases.fetch({
    success: function(){
      app = new MainRouter();
    }
  });
});
