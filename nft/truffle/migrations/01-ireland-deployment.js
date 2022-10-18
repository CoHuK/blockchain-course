const Ireland = artifacts.require("StrongNFT");

module.exports = function(deployer, network, accounts){
    deployer.deploy(Ireland, {from: accounts[0]});
}