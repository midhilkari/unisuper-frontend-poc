import Web3 from 'web3';
import UniSuperLedger from '../../contracts/UniSuperLedger.json';
import EmployeeContract from '../../contracts/Employee.json';
import { getEmployeeContractAddress } from './unisuper.js';

const contract = require("@truffle/contract");

const provider = new Web3.providers.HttpProvider("http://localhost:7545");

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

export const getEmployeeWalletAddress = async(employeeContractAddress: string) => {
    const employeeContractInstance = await employeeContract.at(employeeContractAddress);
    const employeeWalletAddress = await employeeContractInstance.EmployeeAddress.call();

    return employeeWalletAddress;
}

export const getEmployeeAccounts = async(employeeContractAddress: string, ethInstance: any) => {
    console.warn({EMP: employeeContractAddress})
    const employeeContractInstance = await employeeContract.at(employeeContractAddress);
    const arrayOfAccounts = await employeeContractInstance.getArrayOfAccounts();

    return arrayOfAccounts;
}

export const createNewAccount = async(employeeContractAddress: string, ethInstance: any) => {
    const employeeContractInstance = await employeeContract.at(employeeContractAddress);
    await employeeContractInstance.createNewAccount({from: ethInstance.selectedAddress});
    const arrayOfAccounts = await employeeContractInstance.getArrayOfAccounts();

    return arrayOfAccounts;
}
