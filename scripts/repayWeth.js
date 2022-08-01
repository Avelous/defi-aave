const { getNamedAccounts } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")


async function repayWeth() {
    const { deployer } = await getNamedAccounts()

    const iWeth = await ethers.getContractAt(
        "IWeth",
        networkConfig[network.config.chainId].wethToken,
        deployer
    )

    const wethBalance = await iWeth.balanceOf(deployer)
    const tx = await iWeth.withdraw(wethBalance)
    await tx.wait(1)
    console.log(`Repayed ${wethBalance.toString()} WETH`)
}

repayWeth()

module.exports = { repayWeth, AMOUNT }
