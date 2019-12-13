import Web3 from 'web3';
import UniSuperLedger from '../../contracts/UniSuperLedger.json';
import EmployeeContract from '../../contracts/Employee.json';
// Add dynamic redirection to cloud ganache instance
import GanacheIns from './../../assets/connections/ExternalConnection.json'; 

const utils = require("ethereumjs-util")
const contract = require("@truffle/contract");

//const provider = new Web3.providers.HttpProvider("http://localhost:7545");
const provider = new Web3.providers.HttpProvider(GanacheIns.ganacheIP);


const uniSuperLedger = contract({
    abi: UniSuperLedger.abi,
    unlinked_binary: UniSuperLedger.bytecode,
})

const employeeContract = contract({
    abi: EmployeeContract.abi,
    unlinked_binary: EmployeeContract.bytecode
})

uniSuperLedger.setProvider(provider);
employeeContract.setProvider(provider);

export const getEmployeeContractAddress = async (username: string) => {
	uniSuperLedger.setProvider(provider);
    employeeContract.setProvider(provider);

    let uniSuperInstance = await uniSuperLedger.at(UniSuperLedger.networks[5777].address);
    const employeeContractAddress = await uniSuperInstance.getEmployeeContractAddress(username);

    return employeeContractAddress

}

export const validateUserLogin = (msg: string, signature: string, employeeWalletAddress: string) => {
    const msgBuffer = utils.toBuffer(msg);
    const msgHash = utils.hashPersonalMessage(msgBuffer);

    const signatureBuffer = utils.toBuffer(signature);
    const signatureParams = utils.fromRpcSig(signature);
    const publicKey = utils.ecrecover(
      msgHash,
      signatureParams.v,
      signatureParams.r,
      signatureParams.s
    );
    const addressBuffer = utils.publicToAddress(publicKey);
    const address = utils.bufferToHex(addressBuffer);

    return address == employeeWalletAddress.toLowerCase()
}
