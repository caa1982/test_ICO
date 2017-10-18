const Crowdsale = artifacts.require("./TwoGetherCrowdsale.sol");

module.exports = function(deployer, network, accounts) {
  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 3; 
  const endTime = startTime + (86400 * 48); //48 days
  const preSaleEnd = startTime + 120; //after 60 sec => propose (86400 * 18)
  const rate = new web3.BigNumber(1000);
  const cap = new web3.BigNumber(web3.toWei(25, 'ether'));
  const privateInvestorAllocaion = new web3.BigNumber(web3.toWei(1, 'ether'));
  const bonus = new web3.BigNumber(20);
  const preSaleCap = new web3.BigNumber(web3.toWei(3, 'ether'));

  deployer.deploy(Crowdsale, cap, startTime, endTime, preSaleEnd, bonus, preSaleCap, rate, privateInvestorAllocaion)
  /*.then(
    () => Crowdsale.at(Crowdsale.address).token().then( add => 
      console.log("Token Address:", add)
    )
  );*/

};
