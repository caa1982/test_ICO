to install dependecnies
NPM start

launch project
npm run start

launch testrpc individualy
testrpc -a <number of accounts> -m <your 12 seed words from MetaMask or any seeds will do>
e.g testrpc -a 100 -m "pony aim olive task wealth tip run review trust equal foster addict"


Migrate the contract to testrpc
truffle compile 
truffle migrate

to interact with the Contracts use:

1) MetaMask
Import all your accounts

2) Truffle Console
to get address in truffle console, type:
Crowdsale.deployed().then(inst => { tokenAddress = inst.token() })
should return "undefined"
then type: tokenAddress
should return the token address


