import React, { useState, Dispatch, SetStateAction } from 'react';
import { Form, FormControl, InputGroup, Col, Row, Button, Card, Container, Alert } from 'react-bootstrap';
import {allowLegacyMetaMask, allowMetaMask} from '../../actions/metamask/index'
import './Signup.test';
import styled from 'styled-components';
import UniSuperLedger from '../../contracts/UniSuperLedger.json';
import Web3 from 'web3';
//import contract from "@truffle/contract";
var contract = require("@truffle/contract");

type SignupProps = {
	setNewUser: Dispatch<SetStateAction<boolean>>;
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

// const Container = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content:center;
// 	align-items: center;
// 	margin: none;
// 	height: 90vh;
// `;

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
	width: 100%;
	background-color: steelblue;
	:hover{
		background-color: royalblue;
	}
	border: none;
	padding: 10px;
	border-radius: 10px;
`;

const Login = styled(Button)`
	background-color: transparent;
	border: none;
	color: black;
	text-align: center;
	text-decoration: underline;
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

const AdreessLabel = styled.label`
	background: transparent;
	border-radius: 3px;
	border: 2px solid palevioletred;
	color: palevioletred;
	/* margin: 0 1em; */
	padding: 0.25em 1em;
	font-family: Arial, Helvetica, sans-serif;
`;

const CenterAlign = styled.div`
	text-align: center;
	align-items: center;
`;

const Heading = styled.div`
	color: #696969;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 2em;
	padding: 2%;
	font-weight: lighter;
`;

const H6 = styled.h6`
	color: #696969;
	font-family: Arial, Helvetica, sans-serif;
`;

const DateOfBirthField: React.FC<{ setDOB: Dispatch<SetStateAction<string>> }> = ({ setDOB }) => (
	<div style={{ padding: "20px 30px 30px 30px" }}>
		<InputGroup size="lg" className="mb-3">
			<InputGroup.Prepend>
				<InputGroup.Text id="basic-addon2">DOB</InputGroup.Text>
			</InputGroup.Prepend>
			<FormControl
				placeholder="DD / MM / YYYY"
				aria-label="DOB"
				aria-describedby="basic-addon1"
				onKeyUp={(e: any) => { setDOB(e.target.value) }}
			/>
		</InputGroup>
	</div>
)

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

const MetaMaskResults: React.FC<{ ethInstance: any, web3Instance: any, setPublicKey: Dispatch<SetStateAction<string>> }> = ({ ethInstance, web3Instance, setPublicKey }) => {
	return (
		<CenterAlign>
			<div style={{ padding: "20px" }}>
				<Row>
					<Col>
						<H6>Public Key</H6>
						<AdreessLabel>
							{ethInstance.selectedAddress}
						</AdreessLabel>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button variant="info" onClick={() => setPublicKey(ethInstance.selectedAddress)}>Link Personal Account</Button>
					</Col>
				</Row>
			</div>
		</CenterAlign>
	)
}

const MetaMaskIntegrator: React.FC<{ ethInstance: any, web3Instance: any }> = ({ ethInstance, web3Instance }) => {
	let legacy = false;
	const [isMetaMaskEnabled, setEnabledMetaMask] = useState(false);
	if (web3Instance) {
		legacy = true
	}

	return (
		<div style={{ padding: "20px" }}>
			{
				<Button
					variant="info"
					onClick={() => legacy ? allowLegacyMetaMask(web3Instance, setEnabledMetaMask)
						: allowMetaMask(ethInstance, setEnabledMetaMask)}>
					Enable MetaMask
				</Button>
			}
		</div>
	)
}

const SignupQuestions: React.FC<{
	questionCounter: number,
	setUsername: Dispatch<SetStateAction<string>>,
	setDOB: Dispatch<SetStateAction<string>>
	setPublicKey: Dispatch<SetStateAction<string>>
	ethInstance: any,
	web3Instance: any
}> =
	({ questionCounter, setUsername, setDOB, setPublicKey, ethInstance, web3Instance }:
		{
			questionCounter: number,
			setUsername: Dispatch<SetStateAction<string>>,
			setDOB: Dispatch<SetStateAction<string>>,
			setPublicKey: Dispatch<SetStateAction<string>>,
			ethInstance: any,
			web3Instance: any
		}) => {

		switch (questionCounter) {
			case (0):
				return <div>
					<Card.Header>
						<CenterAlign>
							<Heading> Create New Account</Heading>
						</CenterAlign>
					</Card.Header>
					<Card.Body>
						<UserNameField setUsername={setUsername} />
						<DateOfBirthField setDOB={setDOB} />
					</Card.Body>
				</div>
			case (1):
				return <div>
					<Card.Header>
						<CenterAlign>
							<Heading> Create New Account</Heading>
						</CenterAlign>
					</Card.Header>
					<Card.Body>
						<CenterAlign>
							{
								!ethInstance && !web3Instance ?
									<Alert variant="warning">
										<div style={{ padding: "20px" }}>
											<H6>Oops! it seems like you haven't install <strong><em>Meta Mask</em></strong> in your browser <Alert.Link href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-GB" target="_blank"> Click Here!</Alert.Link> to install.</H6>
										</div>
									</Alert>
									:
									<MetaMaskIntegrator ethInstance={ethInstance} web3Instance={web3Instance} />
							}
						</CenterAlign>
					</Card.Body>
				</div>

			default:
				return <div>
					<Card.Header>
						<CenterAlign>
							<Heading> Create New Account</Heading>
						</CenterAlign>
					</Card.Header>
					<Card.Body>
						<MetaMaskResults ethInstance={ethInstance} web3Instance={web3Instance} setPublicKey={setPublicKey} />
					</Card.Body>
				</div>

		}
	}

const createAccountContract = async ({ signupData, ethInstance, web3Instance, setNewUser}: { signupData: SignupData, ethInstance: any, web3Instance: any, setNewUser: Dispatch<SetStateAction<boolean>> }) => {
	console.log(signupData);
	// console.warn({contract, ethInstance, web3Instance, UniSuperLedger})
	// handles ...  await web3Instance.Employee.createNewAccount()
	var provider = new Web3.providers.HttpProvider("http://localhost:7545");

	const uniSuperLedger = contract({
		abi: UniSuperLedger.abi,
		unlinked_binary: UniSuperLedger.bytecode,
		address: UniSuperLedger.networks[5777].address
	})
	uniSuperLedger.setProvider(provider);
	let instance = await uniSuperLedger.at(UniSuperLedger.networks[5777].address);
	await instance.createEmployeeId(signupData.dateOfBirth, signupData.publicKey, signupData.username, { from: signupData.publicKey });

	setNewUser(false);
}

export default ({ setNewUser, ethInstance, web3Instance }: SignupProps) => {
	const initialSignUpData: SignupData = { username: null, dateOfBirth: null, publicKey: '' }

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
		<Container style={{ padding: '50px' }}>
			<Row>
				<Col></Col>
				<Col md={6}>
					<div className="shadow mb-5 bg-white rounded">
						<Card border="light" style={{ width: '100%' }}>

							<SignupQuestions
								questionCounter={questionCounter}
								setUsername={setUsername}
								setDOB={setDOB}
								setPublicKey={setPublicKey}
								ethInstance={ethInstance}
								web3Instance={web3Instance}
							/>

							<Card.Footer>
								<CenterAlign>
									{
										questionCounter < 2 ?

											<Row>
												<Col>
													<StyledButton onClick={() => { setQuestionCounter((questionCounter - 1) % 3) }}>Back</StyledButton>
												</Col>
												<Col>
													<StyledButton onClick={() => { setQuestionCounter((questionCounter + 1) % 3) }}>Next</StyledButton>
												</Col>
											</Row>
											:
											<StyledButton onClick={() => { createAccountContract({ signupData, ethInstance, web3Instance, setNewUser }) }}>Submit</StyledButton>
									}
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
