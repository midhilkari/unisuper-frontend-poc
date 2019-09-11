import React, { useState, Dispatch, SetStateAction } from 'react';
import {Form, FormControl, InputGroup, Col, Row, Button} from 'react-bootstrap';
import './Signup.test';
import styled from 'styled-components';

type SignupProps = {
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
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


const MetaMaskExtractor: React.FC = ({}) => {

	// Is MetaMask installed ?

	// Is MetaMask allowed ?

	// What is the address ?

	// Can the user sign a message to prove ownership ?

	//


	return (
	<InputGroup className="mb-3">
		<div>Add Metamask Extractor</div>
	</InputGroup>)
}

const SignupQuestions: React.FC<{questionCounter: number, setUsername: Dispatch<SetStateAction<string>>, setDOB:Dispatch<SetStateAction<string>>}> = ({questionCounter, setUsername, setDOB}:{questionCounter: number, setUsername: Dispatch<SetStateAction<string>>, setDOB: Dispatch<SetStateAction<string>>}) => {

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
					<div>Add Metamask Integrater</div>
				</StyledInputGroup>
		default:
			return <StyledInputGroup>
			<div style={{textAlign: "center", fontWeight: "bold", padding: "2%"}}> Create New Account</div>
			<MetaMaskExtractor/>
		</StyledInputGroup>
	}
}

const createAccountContract = ({signupData}:{signupData: SignupData}) => {
	console.log(signupData);
	// handles ...  await web3Instance.Employee.createNewAccount()
}

export default ({setLoggedIn}: SignupProps) => {
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

	console.warn({username, dateOfBirth, publicKey})
	console.warn({questionCounter})
	return (
		<Container>
			<ContainerInputGroup>
				<SignupQuestions questionCounter={questionCounter} setUsername={setUsername} setDOB={setDOB}/>
			</ContainerInputGroup>
			<ControlButtonGroup>
				{
					questionCounter < 2?

					<div>
						<StyledButton onClick={()=>{setQuestionCounter((questionCounter - 1) % 3)}}>Back</StyledButton>
						<StyledButton onClick={()=>{setQuestionCounter((questionCounter + 1) % 3)}}>Next</StyledButton>
					</div>
					:
					<StyledButton onClick={()=>{createAccountContract({signupData})}}>Submit</StyledButton>
				}
			</ControlButtonGroup>
		</Container>
	)
}
