import {Dispatch, SetStateAction} from 'react'

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
