pragma solidity ^0.4.11;

import './TwoGetherPrivateInvestment.sol';

/**
 * @title TwoGetherBonus
 * @dev Extension of Crowdsale with a adding bonus for early investors
 */
contract TwoGetherPreSale is TwoGetherPrivateInvestment {
    
    // bonuse in percentage
    uint256 public bonus;

    // Pre-sale bonus end
    uint256 public preSaleEnd;

    // Pre-sale cap
    uint256 public preSaleCap;

    function TwoGetherPreSale(uint256 _bonus, uint256 _preSaleEnd, uint256 _preSaleCap){
        require(_bonus > 0);
        require(_preSaleEnd > 0);
        require(_preSaleCap > 0);
        
        bonus = _bonus;
        preSaleEnd = _preSaleEnd;
        preSaleCap = _preSaleCap;
    }

    function preSaleStatus() constant public returns(bool success) {
        return block.timestamp > preSaleEnd ? false : true;   
    }
    
    // overriding Crowdsale#buyTokens to add extra bonus logic
    function buyTokens(address beneficiary) public payable {
        require(beneficiary != 0x0);
        require(validPurchase());

        uint256 weiAmount = msg.value;

        // update state
        weiRaised = weiRaised.add(weiAmount);

        // calculate token amount to be created before and after bonus
        uint256 tokens;

        if(block.timestamp < preSaleEnd && weiRaised <= preSaleCap){
            uint256 bonusRate = rate.div(100).mul(bonus).add(rate);
            tokens = weiAmount.mul(bonusRate);
        }else if (block.timestamp < preSaleEnd && weiRaised > preSaleCap){
            revert();
        }else{
            tokens = weiAmount.mul(rate);
        }

        token.mint(beneficiary, tokens);
        TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

        forwardFunds();
    }

}
  