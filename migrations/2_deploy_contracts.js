const TokenFarm = artifacts.require("TokenFarm");
const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken"); 

module.exports = async function(deployer, network, accounts) {
  //Deploy Mock DAI Token
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  //Deploy Dapp Token
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();

  //Transfer all tokens to TokenFarm (1mil)
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  //Transfer 100 mock dai to investor
  await daiToken.transfer(accounts[1], '100000000000000000000');
};
