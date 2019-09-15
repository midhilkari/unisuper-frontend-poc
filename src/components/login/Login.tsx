import React, { useState, Dispatch, SetStateAction } from 'react';
import {FormControl, InputGroup, Col, Row, Button, Card, Container, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import {getMessageSignature} from '../../actions/contracts/generic';
import {getEmployeeContractAddress, validateUserLogin} from '../../actions/contracts/unisuper';
import {getEmployeeWalletAddress} from '../../actions/contracts/employee';

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

type LoginProps = {
    setLoggedIn: Dispatch<SetStateAction<boolean | string>>;
    setNewUser: Dispatch<SetStateAction<boolean>>;
	web3Instance: any;
}

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

const validateLogin =  async ({ setLoggedIn, username, web3Instance }: { setLoggedIn: Dispatch<SetStateAction<boolean | string>>, username: string, web3Instance: any }) => {
	console.warn(username);
	const employeeContractAddress = await getEmployeeContractAddress(username)
	const employeeWalletAddress = await getEmployeeWalletAddress(employeeContractAddress);

	const msg = 'Login Attempt';
	const signature = await getMessageSignature(web3Instance, employeeWalletAddress, msg);
	const isValidLogin = await validateUserLogin(msg, signature, employeeWalletAddress);

	if(isValidLogin) setLoggedIn(username);
}

export default ({ setLoggedIn, setNewUser, web3Instance }: LoginProps) => {
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
                                    <StyledButton onClick={() => { validateLogin({setLoggedIn, username, web3Instance }) }}>Login</StyledButton>
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
