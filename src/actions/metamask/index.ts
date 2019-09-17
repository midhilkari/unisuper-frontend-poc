import {Dispatch, SetStateAction} from 'react'
const BN = require('bn.js');

export const allowLegacyMetaMask = (web3Instance: any, setEnableMetaMask: Dispatch<SetStateAction<boolean>>) => {
	web3Instance.currentProvider.enable().then(() => {
		setEnableMetaMask(true)
	}).catch(() => setEnableMetaMask(false))
}

export const allowMetaMask = (ethInstance: any, setEnableMetaMask: Dispatch<SetStateAction<boolean>>) => {
	ethInstance.enable().then(() => {
		setEnableMetaMask(true)
	}).catch(() => setEnableMetaMask(false))
}

export const getMessageSignature = (web3Instance: any, address: string, message: string): Promise<string> => new Promise(resolve => {
    web3Instance.personal.sign(message, address, (state:any,data:PromiseLike<any>)=>{
    console.warn(data)
    resolve(data)});
})

export const transferETHtoContract = (ethInstance: any, recipientAddress: string, wei: string): Promise<string> => new Promise(resolve => {
	const transactionParams = {
		from: ethInstance.selectedAddress,
		to: recipientAddress,
		data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
		value: wei
	}

	console.warn({ethInstance})
	ethInstance.sendAsync({
		method: 'eth_sendTransaction',
		params: [transactionParams],
		from: ethInstance.selectedAddress
	}, resolve)
})
