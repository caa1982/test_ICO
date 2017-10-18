pragma solidity ^0.4.11;

import './CappedCrowdsale.sol';
import './Ownable.sol';

contract TwoGetherPrivateInvestment is CappedCrowdsale, Ownable {
    
    // amount of tokens given to private Investors
    uint256 public totalPrivateInvestments;

    function TwoGetherPrivateInvestment (uint256 _privateInvestment){
         
         privateInvestment(_privateInvestment);

    }

    function privateInvestment(uint256 _privateInvestment) onlyOwner public{
        require(_privateInvestment > 0);

        uint256 tokens = _privateInvestment.mul(rate);

        weiRaised = weiRaised.add(_privateInvestment);
        totalPrivateInvestments = totalPrivateInvestments.add(_privateInvestment);
        
        token.mint(owner, tokens);

    }

}