var MasterView = function(countryNames, bucketListData){
  this.selectList = document.getElementById('country-select');
  this.bucketList = document.getElementById('bucket-list');
  this.countryNames = countryNames;
  this.bucketListData = bucketListData;
  this.selectList.onchange = function( ev ) {
    var countryName = ev.target.value;
    var country = {
      name: countryName,
      alpha3Code: "undefined"
    };

    this.bucketListData.push( country );
    this.render();
    this.saveCountry( country );
  }.bind( this );
};

MasterView.prototype = {

  populateSelect: function(){
    this.selectList.innerHTML = "<option value='' disabled selected>Select a country</option>";
    this.countryNames.forEach(function(countryName){
      var option = document.createElement('option');
      option.innerText = countryName;
      this.selectList.appendChild(option);
    }.bind(this));
  },

  render: function() {
    this.bucketList.innerHTML = "";

    this.bucketListData.forEach( function( countryData ) {
      var li = document.createElement( 'li' );
      li.innerText = countryData.name;
      this.bucketList.appendChild( li );
    }.bind( this ));
  },

  saveCountry: function( country ) {
    var url = "http://localhost:3000/bucket-list-countries";
    var request = new XMLHttpRequest();
    request.open( 'POST', url );
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function() {
      if ( request.status == 200 ) {
        console.log("country added to bucket list:", country );
      }
    }
    request.send( JSON.stringify( country ) );
  }

};




module.exports = MasterView;
