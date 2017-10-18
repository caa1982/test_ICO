pragma solidity ^0.4.13;

import './MintableToken.sol';

contract TwoGetherCoin is MintableToken {
    string public name = "2getherToken";
    string public symbol = "2GT";
    uint256 public decimals = 18;
}

