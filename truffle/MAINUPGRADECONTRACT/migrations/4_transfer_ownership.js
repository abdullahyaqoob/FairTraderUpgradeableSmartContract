// migrations/4_prepare_upgrade_boxv2.js
const EthSwap = artifacts.require('EthSwapV2');
const EthSwapV2 = artifacts.require('EthSwapV3');

const { prepareUpgrade, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
    const ethSwap = await EthSwap.deployed();
    console.log('1st contract deployed');
    let boxAns = await upgradeProxy(ethSwap.address, EthSwapV2, { deployer });
    console.log('2nd contract deployed');
    console.log(boxAns.address);
};