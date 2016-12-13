var Bank = require('./bank/bank.js');
var Account = require('./bank/account.js');
// var sampleAccounts = require('./sample.json');
var BankView = require('./views/bank_view.js');

window.onload = function() {
  var bank = new Bank();
  var url = "http://localhost:3000/accounts";
  var request = new XMLHttpRequest();
  request.open( 'GET', url );
  request.onload = function() {
    if ( request.status == 200 ) {
      var sampleAccounts = JSON.parse( this.responseText );

      for(account of sampleAccounts) {
        bank.addAccount(new Account(account));
      }
      var bankView = new BankView(bank);
      bankView.bindEvents();
      bankView.render();
    }
  };
  request.send();
};
