pragma solidity ^0.4.11;

import './TwoGetherCoin.sol';
import './TwoGetherPreSale.sol';

contract TwoGetherCrowdsale is TwoGetherPreSale {

    function TwoGetherCrowdsale(
        uint256 _cap,
        uint256 _startTime, 
        uint256 _endTime,
        uint256 _preSaleEnd,
        uint256 _bonus,
        uint256 _preSaleCap,
        uint256 _rate,
        uint256 _privateInvesment) 
        CappedCrowdsale(_cap)
        TwoGetherPreSale(_bonus, _preSaleEnd, _preSaleCap)
        TwoGetherPrivateInvestment(_privateInvesment)
        Crowdsale(_startTime, _endTime, _rate, msg.sender){}

    function createTokenContract() internal returns (MintableToken) {
        return new TwoGetherCoin();
    }

}


