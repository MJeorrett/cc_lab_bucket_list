var MasterView = require('./views/masterView'); 

window.onload = function() {
  var url = "https://restcountries.eu/rest/v1/all";
  var request = new XMLHttpRequest();
  request.open( 'GET', url );

  request.onload = function() {
    if ( request.status === 200 ) {
      var allCountriesData = JSON.parse( this.responseText );
      var allCountryNames = allCountriesData.map( function( countryData ) {
        return countryData.name;
      });
      var masterView = new MasterView(allCountryNames, null);
      masterView.populateSelect();
    }
  };
  request.send();
};
