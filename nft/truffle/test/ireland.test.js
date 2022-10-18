const Ireland = artifacts.require("StrongNFT")
const truffleAssert = require("truffle-assertions")

contract("Ireland", (accounts) => {
    it("should credit an NFT to a specific account", async() => {
        const irelandInstance = await Ireland.deployed();
        let txResult = await irelandInstance.safeMint(accounts[1], "nft_travel_maps_ireland.json");
        truffleAssert.eventEmitted(txResult, "Transfer", {from: '0x0000000000000000000000000000000000000000', to: accounts[1], tokenId: web3.utils.toBN("0")})
        assert.equal(await irelandInstance.ownerOf(0), accounts[1], "Owner of the NFT is wrong");
    })
})