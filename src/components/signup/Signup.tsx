import React, { useState, Dispatch, SetStateAction } from 'react';
import {Form, FormControl, InputGroup, Col, Row, Button} from 'react-bootstrap';
import './Signup.test';
import styled from 'styled-components/macro';

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



const DateOfBirthField: React.FC = ({}) => (
	<InputGroup className="mb-3">
		<InputGroup.Prepend>
			<InputGroup.Text id="basic-addon2">DOB</InputGroup.Text>
		</InputGroup.Prepend>
		<FormControl
			placeholder="DD / MM / YYYY"
			aria-label="DOB"
			aria-describedby="basic-addon1"
		/>
	</InputGroup>)

const UserNameField: React.FC = ({}) => (
	<InputGroup className="mb-3">
		<InputGroup.Prepend>
			<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
		</InputGroup.Prepend>
		<FormControl
			placeholder="Username"
			aria-label="Username"
			aria-describedby="basic-addon1"
		/>
	</InputGroup>)


const MetaMaskIntegrator: React.FC = ({}) => {

	// Is MetaMask installed ?

	// Is MetaMask allowed ?

	// What is the address ?

	// Can the user sign a message to prove ownership ?

	//


	return (
	<InputGroup className="mb-3">
		<InputGroup.Prepend>
			<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
		</InputGroup.Prepend>
		<FormControl
			placeholder="Username"
			aria-label="Username"
			aria-describedby="basic-addon1"
		/>
	</InputGroup>)
}

const SignupQuestions: React.FC<{questionCounter: number, setUsername: Dispatch<SetStateAction<string>>}> = ({questionCounter, setUsername}:{questionCounter: number, setUsername: Dispatch<SetStateAction<string>>}) => {

	switch(questionCounter) {
		case(0):
			return <StyledInputGroup>
					<div style={{textAlign: "center", fontWeight: "bold", padding: "2%"}}> Create New Account</div>
					<UserNameField/>
					<DateOfBirthField/>
				</StyledInputGroup>
		case(1):
			return <StyledInputGroup>
					<div style={{textAlign: "center", fontWeight: "bold", padding: "2%"}}> Create New Account</div>
					<DateOfBirthField/>
				</StyledInputGroup>
		default:
			return <MetaMaskIntegrator/>
	}
}

const createAccountContract = ({signupData}:{signupData: SignupData}) => {
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
	return (
		<Container>
			<ContainerInputGroup>
				<SignupQuestions questionCounter={questionCounter} setUsername={setUsername}/>
			</ContainerInputGroup>
			<ControlButtonGroup>
				{
					questionCounter < 3?

					<div>
						<StyledButton onClick={()=>{setQuestionCounter((questionCounter + 1) % 3)}}>Back</StyledButton>
						<StyledButton onClick={()=>{setQuestionCounter((questionCounter - 1) % 3)}}>Next</StyledButton>
					</div>
					:
					<StyledButton onClick={()=>{createAccountContract({signupData})}}>Submit</StyledButton>
				}
			</ControlButtonGroup>
		</Container>
	)
}
