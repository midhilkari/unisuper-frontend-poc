import React, {useState, useEffect} from 'react';
import Header from '../header/Header';
import Signup from '../signup/Signup';
import Menu from '../menu/Menu';
import Details from '../details/Details';
import Web3 from 'web3';
const contract = require('truffle-contract');

declare global {
	interface Window {
	   web3: any;
	}
}

const mockData = {
	isLoggedIn: false,
	accountName: "Pesce",
	selectedMenu: "Account",
	accountAddress: "0x00000000000000000",
	privateKey: ""
}

const establishWeb3ProviderConnection = () => {
	if(window.web3) {
		return new Web3(window.web3.currentProvider);
	} else {
		return null
	}
}

const App: React.FC = () => {
	const [isLoggedIn, setLoggedIn] = useState(mockData.isLoggedIn)
	const [selectedMenu, setSelectedMenu] = useState(mockData.selectedMenu);
	const [web3Instance, setWeb3Instance] = useState(new Web3("http://localhost:7545"));

	// useEffect(()=>{
	// 	const _web3 = establishWeb3ProviderConnection();
	// 	if(_web3 !== null) {
	// 		setWeb3Instance(_web3);
	// 		console.warn({_web3})
	// 	}
	// }, [])

	console.warn({web3Instance})
	if(isLoggedIn) {
		return (
			<div className="App">
				<Header/>
				<Menu accountName={mockData.accountName} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
				<Details selectedMenu={selectedMenu} accountAddress={mockData.accountAddress}/>
			</div>
		);
	} else {
		return (
			<div>
				<Header/>
				<Signup setLoggedIn={setLoggedIn}/>
			</div>
		)
	}
}

export default App;
