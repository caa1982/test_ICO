const Crowdsale = artifacts.require("./TwoGetherCrowdsale.sol");

module.exports = function(deployer, network, accounts) {
  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 3; 
  const endTime = startTime + (86400 * 48); //48 days
  const preSaleEnd = startTime + 240; //after 60 sec => propose (86400 * 18)
  const rate = 1000;
  const cap = web3.toWei(25, 'ether');
  const privateInvestorAllocaion = web3.toWei(1, 'ether');
  const bonus = 20;
  const preSaleCap = web3.toWei(3, 'ether');

  deployer.deploy(Crowdsale, cap, startTime, endTime, preSaleEnd, bonus, preSaleCap, rate, privateInvestorAllocaion)
  /*.then(
    () => Crowdsale.at(Crowdsale.address).token().then( add => 
      console.log("Token Address:", add)
    )
  );*/

};
