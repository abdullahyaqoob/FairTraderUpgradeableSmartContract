// migrations/4_prepare_upgrade_boxv2.js
const EthSwap = artifacts.require('EthSwap');
const EthSwapV2 = artifacts.require('EthSwapV2');
 
const { prepareUpgrade, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
 
module.exports = async function (deployer) {
  
  const ethSwap = await EthSwap.deployed();
  console.log("1st line Executed");

  let boxAns = await upgradeProxy(ethSwap.address, EthSwapV2, { deployer });
  console.log("2nd line Executed");
  console.log(boxAns);

};