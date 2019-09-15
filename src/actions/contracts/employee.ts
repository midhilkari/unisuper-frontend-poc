import Web3 from 'web3';
import UniSuperLedger from '../../contracts/UniSuperLedger.json';
import EmployeeContract from '../../contracts/Employee.json'

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
