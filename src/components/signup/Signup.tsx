import React, { useState, Dispatch, SetStateAction } from 'react';
import {Form, FormControl, InputGroup, Col, Row, Button} from 'react-bootstrap';
import './Signup.test';
import styled from 'styled-components';
import UniSuperLedger from '../../contracts/UniSuperLedger.json';
import Web3 from 'web3';
//import contract from "@truffle/contract";
var contract = require("@truffle/contract");

type SignupProps = {
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
	web3Instance: any;
	ethInstance: any;
}

type QuestionProps = {
	questionCounter: number
}

type SignupData = {
	username: string | null,
	dateOfBirth: string | null,
	publicKey: string | null
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content:center;
	align-items: center;
	margin: none;
	height: 90vh;
`;

const ContainerInputGroup = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const StyledInputGroup = styled(InputGroup)`
	display: flex;
	flex-direction:column;
	width: 50%;
`;

const ControlButtonGroup = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 50%;


`;

const StyledForm = styled(Form)`
	width:70%;
	height: 80%;
`

const StyledButton = styled(Button)`
	width: 15vw;
`;

const Login = styled(Button)`
	background-color: transparent;
	border: none;
	color: black;
	text-align: center;
	text-decoration: underline;
	width: 100%;

	::focus {
		transition: none;
		color: blue;
	}

	:hover {
		background-color: transparent;
		border-color: none;
		color:blue;
	}
`;



const DateOfBirthField: React.FC<{setDOB: Dispatch<SetStateAction<string>>}> = ({setDOB}) => (
	<InputGroup className="mb-3">
		<InputGroup.Prepend>
			<InputGroup.Text id="basic-addon2">DOB</InputGroup.Text>
		</InputGroup.Prepend>
		<FormControl
			placeholder="DD / MM / YYYY"
			aria-label="DOB"
			aria-describedby="basic-addon1"
			onKeyUp = {(e: any) => {setDOB(e.target.value)}}
		/>
	</InputGroup>)

const UserNameField: React.FC<{setUsername: Dispatch<SetStateAction<string>>}> = ({setUsername}: {setUsername: Dispatch<SetStateAction<string>>}) => (
	<InputGroup className="mb-3">
		<InputGroup.Prepend>
			<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
		</InputGroup.Prepend>
		<FormControl
			placeholder="Username"
			aria-label="Username"
			aria-describedby="basic-addon1"
			onKeyUp = {(e: any) =>  {setUsername(e.target.value)}}
		/>
	</InputGroup>)

const allowLegacyMetaMask = (web3Instance: any, setEnableMetaMask:Dispatch<SetStateAction<boolean>>) =>{
	web3Instance.currentProvider.enable().then(()=>{
		setEnableMetaMask(true)
	}).catch(() => setEnableMetaMask(false))
}

const allowMetaMask = (ethInstance: any, setEnableMetaMask:Dispatch<SetStateAction<boolean>>) =>{
	ethInstance.enable().then(()=>{
		setEnableMetaMask(true)
	}).catch(() => setEnableMetaMask(false))
}

const MetaMaskResults: React.FC<{ethInstance: any, web3Instance: any, setPublicKey:Dispatch<SetStateAction<string>>}> = ({ethInstance, web3Instance, setPublicKey}) => {
	return <div>
		<label>
			{ethInstance.selectedAddress}
		</label>
		<button onClick={() => setPublicKey(ethInstance.selectedAddress)}>Link Personal Account</button>
	</div>
}

const MetaMaskIntegrator: React.FC<{ethInstance: any, web3Instance: any}> = ({ethInstance, web3Instance}) => {
	let legacy = false;
	const [isMetaMaskEnabled, setEnabledMetaMask] = useState(false);
	if(web3Instance) {
		legacy = true
	}

	return (
	<InputGroup className="mb-3">
		{
			<Button
			onClick={() => legacy? allowLegacyMetaMask(web3Instance, setEnabledMetaMask)
				: allowMetaMask(ethInstance, setEnabledMetaMask)}>
				Enable MetaMask
			</Button>
		}
	</InputGroup>)
}

const SignupQuestions: React.FC<{
	questionCounter: number,
	setUsername: Dispatch<SetStateAction<string>>,
	setDOB:Dispatch<SetStateAction<string>>
	setPublicKey:Dispatch<SetStateAction<string>>
	ethInstance: any,
	web3Instance: any}> =
	({questionCounter, setUsername, setDOB, setPublicKey, ethInstance, web3Instance}:
	{
		questionCounter: number,
		setUsername: Dispatch<SetStateAction<string>>,
		setDOB: Dispatch<SetStateAction<string>>,
		setPublicKey: Dispatch<SetStateAction<string>>,
		ethInstance: any,
		web3Instance: any
	}) => {

	switch(questionCounter) {
		case(0):
			return <StyledInputGroup>
					<div style={{textAlign: "center", fontWeight: "bold", padding: "2%"}}> Create New Account</div>
					<UserNameField setUsername={setUsername}/>
					<DateOfBirthField setDOB={setDOB}/>
				</StyledInputGroup>
		case(1):
			return <StyledInputGroup>
					<div style={{textAlign: "center", fontWeight: "bold", padding: "2%"}}> Create New Account</div>
					{
						!ethInstance && !web3Instance?
						<div>Please Install MetaMask</div>
						:
						<MetaMaskIntegrator ethInstance={ethInstance} web3Instance={web3Instance}/>
					}
				</StyledInputGroup>
		default:
			return <StyledInputGroup>
			<div style={{textAlign: "center", fontWeight: "bold", padding: "2%"}}> Create New Account</div>
			<MetaMaskResults ethInstance={ethInstance} web3Instance={web3Instance} setPublicKey={setPublicKey}/>
		</StyledInputGroup>
	}
}

const createAccountContract = async({signupData, ethInstance, web3Instance}:{signupData: SignupData, ethInstance: any, web3Instance: any }) => {
	console.log(signupData);
	// console.warn({contract, ethInstance, web3Instance, UniSuperLedger})
	// handles ...  await web3Instance.Employee.createNewAccount()
	var provider = new Web3.providers.HttpProvider("http://localhost:7545");

	const uniSuperLedger = contract({
		abi: UniSuperLedger.abi,
		unlinked_binary: UniSuperLedger.bytecode,
		address: '0x31284B060A9f1a108915f13066868A55c783F215'
	})
	uniSuperLedger.setProvider(provider);
	let instance = await uniSuperLedger.at('0x31284B060A9f1a108915f13066868A55c783F215');
	instance.createEmployeeId(signupData.dateOfBirth, signupData.publicKey, signupData.username, {from: signupData.publicKey});

	console.warn({uniSuperLedger});
}

export default ({setLoggedIn,  ethInstance, web3Instance}: SignupProps) => {
	const initialSignUpData: SignupData = {username:null, dateOfBirth:null, publicKey:''}

	const [questionCounter, setQuestionCounter] = useState(0)
	const [username, setUsername] = useState('')
	const [dateOfBirth, setDOB] = useState('')
	const [publicKey, setPublicKey] = useState('initialSignUpData')

	const signupData: SignupData = {
		username,
		dateOfBirth,
		publicKey
	}

	return (
		<Container>
			<ContainerInputGroup>
				<SignupQuestions
					questionCounter={questionCounter}
					setUsername={setUsername}
					setDOB={setDOB}
					setPublicKey={setPublicKey}
					ethInstance={ethInstance}
					web3Instance={web3Instance}
					/>
			</ContainerInputGroup>
			<ControlButtonGroup>
				{
					questionCounter < 2?

					<div>
						<StyledButton onClick={()=>{setQuestionCounter((questionCounter - 1) % 3)}}>Back</StyledButton>
						<StyledButton onClick={()=>{setQuestionCounter((questionCounter + 1) % 3)}}>Next</StyledButton>
					</div>
					:
					<StyledButton onClick={()=>{createAccountContract({signupData, ethInstance, web3Instance})}}>Submit</StyledButton>
				}
			</ControlButtonGroup>
		</Container>
	)
}
