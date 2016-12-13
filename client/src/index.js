window.onload = function() {
  var url = "https://restcountries.eu/rest/v1/all";
  var request = new XMLHttpRequest();
  request.open( 'GET', url );

  request.onload = function() {
    if ( request.status === 200 ) {
      var allCountriesData = JSON.parse( this.responseText );
      console.log("allCountriesData:", allCountriesData);
      var allCountryNames = allCountriesData.map( function( countryData ) {
        console.log("countryData:", countryData);
        return countryData.name;
      });
      console.log("allCountryNames:", allCountryNames);
    }
  };
  request.send();
};
