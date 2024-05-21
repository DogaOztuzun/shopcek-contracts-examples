require('dotenv').config();
const { ethers, JsonRpcProvider } = require('ethers');

// Import the ABI of Receipt contract
const ShopcekReceiptABI = require('../ABI/ShopcekReceipt.abi.json');

// Load environment variables
const privateKey = process.env.WALLETKEY;
const contractAddress = process.env.RECEIPTCONTRACT;
const rpcURL = "https://opbnb-testnet-rpc.bnbchain.org/";
// const rpcURL = "http://localhost:8545";

const provider = new JsonRpcProvider(rpcURL);
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(contractAddress, ShopcekReceiptABI, wallet);

const getOwner = async () => {
    try {
        const query = await contract.owner();
        console.log('Owner', query);
    } catch (error) {
        console.error('Failed:', error);
    }
};

const getMinter = async () => {
    try {
        const query = await contract.minter();
        console.log('Minter', query);
    } catch (error) {
        console.error('Failed:', error);
    }
};

const setMinter = async () => {
    try {
        const tx = await contract.setMinter("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");
        console.log('Transaction sent:', tx.hash);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log('Transaction mined:', receipt);
    } catch (error) {
        console.error('Failed:', error);
    }
};

getOwner();
getMinter();
//setMinter();