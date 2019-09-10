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
	dateOfbirth: string | null,
	accountNumber: string | null
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

const SignupQuestions: React.FC<{questionCounter: number}> = ({questionCounter}:{questionCounter: number}) => {

	switch(questionCounter) {
		case(0):
			return <StyledInputGroup>
					<div style={{textAlign: "center", fontWeight: "bold", padding: "2%"}}> Create New Account</div>
					<UserNameField/>
					<DateOfBirthField/>
				</StyledInputGroup>
		case(1):
			return <div>hello</div>
		default:
			return <MetaMaskIntegrator/>
	}
}

export default ({setLoggedIn}: SignupProps) => {
	const [questionCounter, setQuestionCounter] = useState(0)

	return (
		<Container>
			<ContainerInputGroup>
				<SignupQuestions questionCounter={questionCounter}/>
			</ContainerInputGroup>
			<ControlButtonGroup>
				<StyledButton onClick={()=>{setQuestionCounter((questionCounter + 1) % 3)}}>Back</StyledButton>
				<StyledButton onClick={()=>{setQuestionCounter((questionCounter + 1) % 3)}}>Next</StyledButton>
			</ControlButtonGroup>
		</Container>
	)
}
