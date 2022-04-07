const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraMainKey = "https://mainnet.infura.io/v3/77c7915da3da48159574da3eebedf275";
const infuraMainKey = "wss://mainnet.infura.io/ws/v3/f5846a03eaec47c28b102d6d01a2de16";
const infuraRinkebyKeyws = "wss://rinkeby.infura.io/ws/v3/f5846a03eaec47c28b102d6d01a2de16"
//
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      networkCheckTimeout: 1000000,
      from: "0x458566EDf0eE35f50D08AbF51bddd6aB1748C6E9",
      provider: () => new HDWalletProvider(mnemonic, infuraRinkebyKeyws),
      network_id: 4,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    main: {
      networkCheckTimeout: 1000000,
      from: "0x458566EDf0eE35f50D08AbF51bddd6aB1748C6E9",
      provider: () => new HDWalletProvider(mnemonic, infuraMainKey),
      network_id: 1,       // Ropsten's id
      // gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 5,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    testnet: {
      networkCheckTimeout: 1000000,
      from: "0x458566EDf0eE35f50D08AbF51bddd6aB1748C6E9",
      provider: () => new HDWalletProvider(mnemonic, `wss://data-seed-prebsc-1-s2.binance.org:8545`),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      networkCheckTimeout: 1000000,
      from: "0x458566EDf0eE35f50D08AbF51bddd6aB1748C6E9",
      provider: () => new HDWalletProvider(mnemonic, `wss://bsc-ws-node.nariox.org:443`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
}
