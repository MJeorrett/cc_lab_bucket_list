var Account = require('../bank/account');

var BankView = function(bank) {
  this.bank = bank;
};

BankView.prototype = {

  bindEvents: function(){
    var interestButton = document.getElementById('interest-button');
    interestButton.onclick = function() {
      this.bank.payInterest(10);
      this.render();
    }.bind(this);

    var form = document.querySelector( '#add-account' );
    form.onsubmit = function( ev ) {
      ev.preventDefault();
      var account = {
        owner: ev.target.owner.value,
        amount: parseFloat( ev.target.amount.value ),
        type: ev.target.type.value
      };

// OPTIMISTIC UPDATE!
      this.bank.addAccount( new Account( account ) );
      this.render();
      this.saveAccount( account );
    }.bind( this );
  },

  saveAccount: function() {
    // console.log( "account:", account);
    var url = "http://localhost:3000/accounts";
    var request = new XMLHttpRequest();
    request.open( 'POST', url );
    request.setRequestHeader( "Content-Type", "application/json" );
    request.onload = function() {
      if ( request.status == 200 ) {
        console.log( "account added:", account );
        console.log("this in saveAccount:onload:", this );

      }
    };
    request.send( JSON.stringify( account ) );
  },

  render: function() {
    var totalDisplay = document.getElementById('total');
    var businessTotalDisplay = document.getElementById('business-total');
    var personalTotalDisplay = document.getElementById('personal-total');

    totalDisplay.innerText = "Total: £" + this.bank.totalCash().toFixed(2);
    businessTotalDisplay.innerText = "Total Business: £" + this.bank.totalCash('business').toFixed(2);
    personalTotalDisplay.innerText = "Total Personal: £" + this.bank.totalCash('personal').toFixed(2);

    var businessAccountList = document.getElementById('business-accounts');
    var personalAccountList = document.getElementById('personal-accounts');

    businessAccountList.innerHTML = "";
    personalAccountList.innerHTML = "";

    this.populateAccountList(businessAccountList, this.bank.filteredAccounts('business'));
    this.populateAccountList(personalAccountList, this.bank.filteredAccounts('personal'));
  },

  createItemForAccount:function(account) {
    var accountListItem = document.createElement('li');
    accountListItem.innerText = account.owner + ": £" + account.amount.toFixed(2);
    return accountListItem;
  },

  populateAccountList:function(listElement, accounts) {
    for(account of accounts) {
      listElement.appendChild(this.createItemForAccount(account));
    }
  }
};

module.exports = BankView;
