import React, { useState, Dispatch, SetStateAction } from 'react';
import { Form, FormControl, InputGroup, Col, Row, Button, Card, Container, Alert } from 'react-bootstrap';

import styled from 'styled-components';
import UniSuperLedger from '../../contracts/UniSuperLedger.json';
import EmployeeContract from '../../contracts/Employee.json'

import Web3 from 'web3';
const utils = require("ethereumjs-util")
const contract = require("@truffle/contract");

type LoginProps = {
    setLoggedIn: Dispatch<SetStateAction<boolean | string>>;
    setNewUser: Dispatch<SetStateAction<boolean>>;
	web3Instance: any;
	ethInstance: any;
}

const StyledButton = styled(Button)`
	width: 100%;
	background-color: steelblue;
	:hover{
		background-color: royalblue;
	}
	border: none;
	padding: 10px;
	border-radius: 10px;
`;

const NewUserButton = styled(Button)`
	background-color: transparent;
	border: none;
	color: black;
	text-align: center;
    text-decoration: underline;
    margin-top:3px;
	width: 100%;

	:focus {
		transition: none;
		color: blue;
	}

	:hover {
		background-color: transparent;
		border-color: none;
		color:blue;
	}
`;

const CenterAlign = styled.div`
	text-align: center;
	align-items: center;
`;

const UserNameField: React.FC<{ setUsername: Dispatch<SetStateAction<string>> }> = ({ setUsername }: { setUsername: Dispatch<SetStateAction<string>> }) => (
	<div style={{ padding: "30px 30px 0px 30px" }}>
		<InputGroup size="lg" className="mb-3">
			<InputGroup.Prepend>
				<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
			</InputGroup.Prepend>
			<FormControl
				placeholder="Username"
				aria-label="Username"
				aria-describedby="basic-addon1"
				onKeyUp={(e: any) => { setUsername(e.target.value) }}
			/>
		</InputGroup>
	</div>
)

const processSignedMessage = (web3Instance: any, address: string, message: string): Promise<string> => new Promise(resolve => {
    web3Instance.personal.sign("Login Attempt", address, (state:any,data:PromiseLike<any>)=>resolve(data));
})

const validateLogin = async ({ setLoggedIn, username, ethInstance, web3Instance }: { setLoggedIn: Dispatch<SetStateAction<boolean | string>>, username: string, ethInstance: any, web3Instance: any }) => {
	console.warn(username);
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

    let uniSuperInstance = await uniSuperLedger.at('0x9d107e28c0c1DB3399011C742699b66c712d2361');
    const employeeContractAddress = await uniSuperInstance.getEmployeeContractAddress(username);

    const employeeContractInstance = await employeeContract.at(employeeContractAddress);
    const employeeWalletAddress = await employeeContractInstance.EmployeeAddress.call();

    const msg = 'Login Attempt'
    const signature = await processSignedMessage(web3Instance, employeeWalletAddress, msg)

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


    if(address == employeeWalletAddress.toLowerCase()) setLoggedIn(address)
}

export default ({ setLoggedIn, setNewUser, ethInstance, web3Instance }: LoginProps) => {
	const [username, setUsername] = useState();

	return (
		<Container style={{ padding: '50px' }}>
			<Row>
				<Col></Col>
				<Col md={6}>
					<div className="shadow mb-5 bg-white rounded">
						<Card border="light" style={{ width: '100%' }}>

							<UserNameField setUsername={setUsername}/>

							<Card.Footer>
								<CenterAlign>
                                    <StyledButton onClick={() => { validateLogin({setLoggedIn, username, ethInstance, web3Instance }) }}>Login</StyledButton>
                                    <NewUserButton onClick={() => { setNewUser(true) }}>Create New Account</NewUserButton>
								</CenterAlign>
							</Card.Footer>
						</Card>
					</div>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	)
}
