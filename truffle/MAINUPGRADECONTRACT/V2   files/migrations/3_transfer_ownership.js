// migrations/4_prepare_upgrade_boxv2.js
const Box = artifacts.require('Box');
const BoxV2 = artifacts.require('BoxV2');
 
const { prepareUpgrade, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
 
module.exports = async function (deployer) {
  const box = await Box.deployed();
  let boxAns = await upgradeProxy(box.address, BoxV2, { deployer });
  console.log(boxAns.address);
};