const Crowdsale = artifacts.require("./TwoGetherCrowdsale.sol");
const MintableToken = artifacts.require('./MintableToken.sol');

contract('Crowdsale', accounts => { 

  let contract;
  let token; 
  
  const owner = accounts[0];
  const buyer1 = accounts[1];
  const buyer2 = accounts[2];
  const buyer3 = accounts[3];
  const amount = web3.toWei(1, "ether");

  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 2; 
  const endTime = startTime + (86400 * 48);
  const preSaleEnd = startTime + 5; 
  const rate = 1000;
  const cap = web3.toWei(100, "ether");
  const privateInvestorAllocaion = web3.toWei(1, "ether");
  const bonus = 20;
  const preSaleCap = web3.toWei(3, "ether");
  
  beforeEach( () => 
    Crowdsale.new(cap, startTime, endTime, preSaleEnd, bonus, preSaleCap, rate, privateInvestorAllocaion, {from: owner})
    .then( instance => { 
      contract = instance 
      return contract.token().then(addr => token = MintableToken.at(addr) )
    })
  );
  
  it("Should be own by the owner", () => 
    contract.owner({from : owner}).then(_owner =>
      assert.equal(_owner, owner, "Contract is not owned by the owner") )
  );

  it("Should be equal to bonus", () => 
    contract.bonus({from : owner}).then(_bonus =>
    assert.equal(_bonus.toString(), bonus.toString(), "Contract bonus is not equal to the predeterimed bonus") )
  );

  it("Should be equal to start time", () => 
    contract.startTime({from : owner}).then(_startTime =>
    assert.equal(_startTime.toString(), startTime.toString(), "Contract start time is not equal to the predeterimed start time") )
  );

  it("Should be equal to end time", () => 
    contract.endTime({from : owner}).then(_endTime =>
    assert.equal(_endTime.toString(), endTime.toString(), "Contract end time is not equal to the predeterimed end time") )
  );

  it("Should be equal to preSaleEnd", () => 
    contract.preSaleEnd({from : owner}).then(_preSaleEnd =>
    assert.equal(_preSaleEnd.toString(), preSaleEnd.toString(), "Contract pre Sale End is not equal to the predeterimed pre Sale End time") ) 
  );

  it("Should be equal to cap", () => 
    contract.cap({from : owner}).then(_cap =>
    assert.equal(_cap.toString(), cap.toString(), "Contract cap is not equal to the predeterimed cap") )
  );

  it("Should be equal to preSaleCap", () => 
    contract.preSaleCap({from : owner}).then(_preSaleCap =>
    assert.equal(_preSaleCap.toString(), preSaleCap.toString(), "Contract preSaleCap is not equal to the predeterimed preSaleCap") )
  );

  it("Should be equal to rate", () => 
    contract.rate({from : owner}).then(_rate =>
    assert.equal(_rate.toString(), rate.toString(), "Contract rate is not equal to the predeterimed rate") )
  );
  
  it("Should be equal to private Investor Allocaion", () =>{
    contract.totalPrivateInvestments({from : owner}).then(_invest => {
      assert.equal(_invest.toString(), privateInvestorAllocaion.toString(), "Contract rate is not equal to the predeterimed rate");
    }); 
  });

  it("Should reflect the private investment allocation to the base account", () =>{
    token.balanceOf(owner, {from: owner}).then(result => {
      assert.equal(result.toString(10), "1000000000000000000000", "the private allocation is not reflect in the base account") 
    }) 
  }); 
  
  it("Should buy 1200 tokens bonus included", () => {
    contract.buyTokens.sendTransaction(buyer1, { from: buyer1, value: amount})
    .then( 
      token.balanceOf(buyer1, {from: owner}).then(result => {
          assert.equal(result.toString(10), "1200000000000000000000", "account[1] did not buy any tokens") 
      }) 
    )
  });

  it("Should return true if the preSale is still valid", () => {
    contract.preSaleStatus({from: owner})
   .then( result => {
    assert.equal(result, true, "test was supposed to return true")
   });
  });

  it("Should buy 1000 tokens bonus excluded and return false for preSalse validity ", (done) => {
    let balance;
    console.log('waiting 6 seconds');
    setTimeout(function() {
      contract.buyTokens.sendTransaction(buyer1, { from: buyer1, value: amount})
      .then( token.balanceOf(buyer1, {from: owner})
    .then(result => { 
      balance = result.toString(10);
      return contract.preSaleStatus({from: owner})
    }).then( result =>{
        assert.equal(balance, "1000000000000000000000", "buyer1 did not buy any tokens");
        assert.equal(result, false, "test was supposed to return false");
      }))
      done();   
    }, 6000);
  });

});
