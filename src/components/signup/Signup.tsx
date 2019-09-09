import React, { Dispatch, SetStateAction } from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';
import './Signup.test';
import styled from 'styled-components/macro';

type SignupProps = {
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Container = styled.div`
	display: flex;
	justify-content:center;
	align-items: center;
	margin: none;
	height: 90vh;
`;

const StyledForm = styled(Form)`
	width:70%;
	height: 80%;
`

const StyledButton = styled(Button)`
	width: 100%
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
export default ({setLoggedIn}: SignupProps) => {
	return (
		<Container>

			<StyledForm>Customer Information
				<Row>
					<Col>
						<Form.Group controlId = "formGroupFirstName">
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text"></Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId = "formGroupLastName">
							<Form.Label>Last Name</Form.Label>
							<Form.Control type="text"></Form.Control>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group controlId = "formGroupEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control type="text"></Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId = "formGroupPhone">
							<Form.Label>Phone</Form.Label>
							<Form.Control type="text"></Form.Control>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group controlId = "formGroupAddress">
							<Form.Label>Address</Form.Label>
							<Form.Control type="text"></Form.Control>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId = "formGroupDOB">
							<Form.Label>Date of Birth</Form.Label>
							<Form.Control type="text"></Form.Control>
						</Form.Group>
					</Col>
				</Row>

				<Row>
					<Col>
						<Form.Group controlId = "formGroupTFN">
							<Form.Label>TFN</Form.Label>
							<Form.Control type="text"></Form.Control>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<StyledButton>Submit</StyledButton>
					<Login>Already have an account? Login Here</Login>
				</Row>
			</StyledForm>

		</Container>
	)
}
