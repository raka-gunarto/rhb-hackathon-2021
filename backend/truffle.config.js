const path = require("path")
require("dotenv").config()
var HDWalletProvider = require("truffle-hdwallet-provider")
var mnemonic = process.env.MNEMONIC
var infura_project_key = process.env.INFURA_KEY
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname + "/contracts"),
  networks: {
    develop: {
      port: 8545
    }, 
    ropsten: {
      provider: () => (
        new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/" + infura_project_key)
      ),
      network_id: 3
    }
  }
};