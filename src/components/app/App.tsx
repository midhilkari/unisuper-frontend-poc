import React, {useState, useEffect} from 'react';
import Header from '../header/Header';
import Signup from '../signup/Signup';
import Menu from '../menu/Menu';
import Details from '../details/Details';
import Login from '../login/login'
import Web3 from 'web3';
const contract = require('truffle-contract');

declare global {
	interface Window {
		web3: any;
		ethereum: any;
	}
}

const mockData = {
	isLoggedIn: false,
	accountName: "Pesce",
	selectedMenu: "Account",
	accountAddress: "0x00000000000000000",
	privateKey: ""
}


const App: React.FC = () => {
	const [isLoggedIn, setLoggedIn] = React.useState<string | boolean>(mockData.isLoggedIn)
	const [isNewUser, setNewUser] = useState(true);
	const [selectedMenu, setSelectedMenu] = useState(mockData.selectedMenu);
	const [web3Instance, setWeb3Instance] = React.useState<any>(false);
	const [ethInstance, setEthereumInstance] = React.useState<any>(false);

	useEffect(()=>{
		if(window.ethereum) {
			setEthereumInstance(window.ethereum);
			setWeb3Instance(window.web3);
		} else if (window.web3) {
			// will need to think of better logic here and validate if this is even necessary
		} else {
			setWeb3Instance(false)
			setEthereumInstance(false)
		}
	}, [])

	if(isLoggedIn) {
		return (
			<div className="App">
				<Header/>
				<Menu accountName={mockData.accountName} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} setLoggedIn={setLoggedIn}/>
				<Details selectedMenu={selectedMenu} accountAddress={mockData.accountAddress}/>
			</div>
		);
	} else {
		return (
			<div>
				<Header/>
				{
					isNewUser?
					<Signup setNewUser={setNewUser} web3Instance={web3Instance} ethInstance={ethInstance}/>
					:
					<Login setLoggedIn={setLoggedIn} setNewUser={setNewUser} web3Instance={web3Instance} ethInstance={ethInstance}/>
				}
			</div>
		);
	}
}

export default App;
