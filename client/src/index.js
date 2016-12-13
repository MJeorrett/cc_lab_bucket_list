var MasterView = require('./views/masterView');

window.onload = function() {

  var bucketListUrl = "http://localhost:3000/bucket-list-countries";
  var bucketListRequest = new XMLHttpRequest();
  bucketListRequest.open( 'GET', bucketListUrl );

  bucketListRequest.onload = function() {

    if ( bucketListRequest.status == 200 ) {

      var bucketListCountriesData = JSON.parse( this.responseText );

      console.log( "bucketListCountriesData:", bucketListCountriesData );

      var url = "https://restcountries.eu/rest/v1/all";
      var request = new XMLHttpRequest();
      request.open( 'GET', url );


      request.onload = function() {
        if ( request.status === 200 ) {
          var allCountriesData = JSON.parse( this.responseText );
          var allCountryNames = allCountriesData.map( function( countryData ) {
            return countryData.name;
          });
          var masterView = new MasterView(allCountryNames, bucketListCountriesData );
          masterView.populateSelect();
          masterView.render();
        }
      };
      request.send();
    }
  };
  bucketListRequest.send();
};
