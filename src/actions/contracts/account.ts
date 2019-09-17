import Account from '../../contracts/Account.json';
import Web3 from 'web3';

const contract = require("@truffle/contract");

const provider = new Web3.providers.HttpProvider("http://localhost:7545");

const accountContract = contract({
    abi: Account.abi,
    unlinked_binary: Account.bytecode
})

accountContract.setProvider(provider);

export const getNetBalance = async(accountContractAddress: string) =>{
    const accountContractInstance = await accountContract.at(accountContractAddress);
    const netBalance = await accountContractInstance.NetBalance.call()

    return netBalance
}

export const getTimeTillReward = async(accountContractAddress: string) =>{
    const accountContractInstance = await accountContract.at(accountContractAddress);
    const timeTillReward = await accountContractInstance.TimeTillReward.call()

    return timeTillReward
}

export const getRewardSize = async(accountContractAddress: string) =>{
    const accountContractInstance = await accountContract.at(accountContractAddress);
    const rewardSize = await accountContractInstance.RewardSize.call()

    return rewardSize
}


export const getPayoutFrequency = async(accountContractAddress: string) =>{
    const accountContractInstance = await accountContract.at(accountContractAddress);
    const payoutFrequency = await accountContractInstance.PayoutFrequency.call()

    return payoutFrequency
}


export const getAccountStatus = async(accountContractAddress: string) =>{
    const accountContractInstance = await accountContract.at(accountContractAddress);
    const accountStatus = await accountContractInstance.AccountStatus.call()

    return accountStatus
}

export const getAccountType = async(accountContractAddress: string) =>{
    const accountContractInstance = await accountContract.at(accountContractAddress);
    const accountType = await accountContractInstance.AccountType.call()

    return accountType
}
