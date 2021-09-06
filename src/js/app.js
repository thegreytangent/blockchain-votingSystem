App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
     return await App.initWeb3();
  },

  initWeb3: async function() {
    
   
    if (typeof web3 !== 'undefined') {
      App.web3Provider =  window.web3.currentProvider;
      web3 = new Web3( window.web3.currentProvider);
     
      
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    
      
    }

      

     
   
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election){
      App.contracts.Election = TruffleContract(election);
      App.contracts.Election.setProvider(App.web3Provider);
      return App.bindEvents();
    });


   
  },

  bindEvents: async function() {

    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();
    


    web3.eth.getCoinbase(function(err, account){
      console.log("--------oo ", account);
      if (err === null) {
        App.account = account;
        $('#accountAddress').html("Your account: " + account);;
      }
    });

    App.contracts.Election.deployed().then( instance => {
      electionInstance = instance;
      return electionInstance.candidateCount();
    }).then(candidateCount => {
     
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidateSelect = $("#candidatesSelect");
      candidateSelect.empty();
      
      
      for (var i = 1; i <= candidateCount; i++ ) {
        electionInstance.candidates(i).then(candidate => {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          var candidateTemplate = `<tr><th>${id}</th><td>${name}</td><td>${voteCount}</td>`;
          candidatesResults.append(candidateTemplate);

          //ballot option
          var candidateOption = `<option value='${id}'>${name}</option>`;
          candidateSelect.append(candidateOption);
        })
      }
      loader.hide();
      content.show();


    }).catch(err => {
      console.warn("errr" , err);
    })


    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
