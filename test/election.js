var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts){
    it('initialize with two candidates', () => {
        return Election.deployed().then(i => {
            return i.candidateCount();
        }).then( count => assert.equal(count ,2))
    });
});