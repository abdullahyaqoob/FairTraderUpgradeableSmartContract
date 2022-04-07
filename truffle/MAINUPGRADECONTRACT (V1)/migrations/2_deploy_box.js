// migrations/2_deploy_box.js
const EthSwap = artifacts.require('EthSwap');

const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
    console.log("2_deploy_box");
    await deployProxy(EthSwap, [
        //bsc
        "0x30C1d16E0B07653D312C9A74Cbf91c774d67b26A",
        //Rinkeby
        // "0x8226b3c67C60637ed2869727Ca3e1f890745D6C0",
        "Fairtrader Instant Exchange",
        120,
        15770000,
        31540000,
        63070000
    ], { deployer, initializer: 'storeConstructor' });
};