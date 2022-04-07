// migrations/2_deploy_box.js
const EthSwap = artifacts.require('EthSwap');

const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
    console.log("2_deploy_box");
    await deployProxy(EthSwap, [
        //bsc mainnet
        // "0x32151D601f6578399136c57030890FbB48eDE685",
        //ETH minnet
        "0x6B71cDc52B6B5e007E9e018D65B233AbeD8589C7",
        "Fairtrader Exchange",
        120,
        15770000,
        31540000,
        63070000,
        "0xfFCe9e061d86999e191cc481715597456b85b2d8"
    ], { deployer, initializer: 'storeConstructor' });
};