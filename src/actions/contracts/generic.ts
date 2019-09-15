export const getMessageSignature = (web3Instance: any, address: string, message: string): Promise<string> => new Promise(resolve => {
    web3Instance.personal.sign(message, address, (state:any,data:PromiseLike<any>)=>{
    console.warn(data)
    resolve(data)});
})
