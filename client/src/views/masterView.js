var MasterView = function(countryNames, bucketListData){
  this.selectList = document.getElementById('country-select');
  this.bucketList = document.getElementById('bucket-list');
  this.countryNames = countryNames;
  this.bucketListData = bucketListData;
};

MasterView.prototype = {

  populateSelect: function(){
    this.selectList.innerHTML = "<option value='' disabled selected>Select a country</option>";
    this.countryNames.forEach(function(countryName){
      var option = document.createElement('option');
      option.innerText = countryName;
      this.selectList.appendChild(option);
    }.bind(this));
  }
};




module.exports = MasterView;