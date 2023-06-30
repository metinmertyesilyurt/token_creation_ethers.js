const { ethers, ContractFactory } = require("ethers")
require("dotenv").config()
const fs = require("fs")

const abi = JSON.parse(fs.readFileSync("tokenabi.json").toString())
const bytecode = JSON.parse(fs.readFileSync("tokenbytecode.json").toString())

const provider = new ethers.EtherscanProvider(
  "sepolia",
  process.env.ETHERSCAN_API
)

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

const main = async () => {
  const gasp0 = await (await provider.getFeeData()).gasPrice

  const options = {
    gasLimit: 2000000,
    gasPrice: gasp0,
  }
  const factory = new ethers.ContractFactory(abi, bytecode.object, signer)
  try {
    const contract = await (
      await factory.deploy("Mytoken", "MT", options)
    ).waitForDeployment()
  } catch (error) {
    console.error("Error deploying contract:", error)
  }
}

main()
