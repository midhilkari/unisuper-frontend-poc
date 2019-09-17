import React, { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Row, Col, Form, FormCheck, Button, Container } from 'react-bootstrap';
import BN from 'bn.js';
import { transferETHtoContract } from '../../actions/metamask/index';

const DepositsContainer = styled(Container)`
	/* margin-left: 2%; */
	margin-top: 2%;
	/* font-weight: bold; */
	/* width: 40%; */
`;


const StyledRow = styled(Row)`
	padding: 2%;
`;

const ColLabel = styled(Col)`

`;

const ColVal = styled(Col)`
	text-align: right;
`;

const Wrapper = styled.div`
	padding: 30px;
	border-radius: 10px;
	/* border: solid lightgray; */
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const StyledButton = styled(Button)`
	/* width: 15%; */
	background-color: steelblue;
	:hover{
		background-color: royalblue;
	}
	border: none;
	padding: 8px 10px 8px 10px;
	border-radius: 5px;
	margin-right: 5px;
`;

const AdreessLabel = styled.label`
	background: transparent;
	border-radius: 3px;
	border: 2px solid steelblue;
	color: steelblue;
	padding: 0.25em 1em;
	font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    margin-top: 5px;
`;

const SubHeading = styled.label`
	color: #696969;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1em;
	font-weight: lighter;
`;

const processTransaction = async (e: any,
	recipientAddress: string,
	amount: string,
	ethInstance: any,
	setCompletedTransaction: Dispatch<SetStateAction<any>>) => {
	const numberOfDecimals = amount.includes(".") ? amount.split(".")[1].length : 0;
	if (numberOfDecimals > 0) amount = amount.replace(/\./, "");
	const base = 18 - numberOfDecimals;
	const ethConverter = new BN(10).pow(new BN(base));
	const wei = new BN(amount).mul(ethConverter).toString(16)
	await transferETHtoContract(ethInstance, recipientAddress, wei);
}

export default ({ username, accountContractAddress, ethInstance, isMocked }: { username: string | boolean, accountContractAddress: string, ethInstance: any, isMocked: boolean }) => {
	console.warn({ depEth: ethInstance })
	const [recipientAddress, setRecipientAddress] = useState('');
	const [useDefault, setUseDefault] = useState(false)
	const [amount, setAmount] = useState('');
	const [completedTransaction, setCompletedTransaction] = useState([]);

	return (<DepositsContainer>
		<Wrapper>
			<Form>
				<Form.Row>
					<Form.Group as={Col}>
						<Col>
							<Form.Label>
								<SubHeading>Account Address</SubHeading><br></br>
							</Form.Label>
						</Col>

						{
							useDefault ?
								<Col>
									<Form.Label>
										<AdreessLabel>
											{accountContractAddress}
										</AdreessLabel>
									</Form.Label>
								</Col>
								:
								<Col md={6}>
									<Form.Control
										type="text"
										onKeyUp={(e: any) => { setRecipientAddress(e.target.value) }}
									/>
								</Col>
						}
					</Form.Group>
				</Form.Row>
				<Form.Row as={Col}>
					<Col>
						<StyledButton onClick={() => {
							setRecipientAddress(accountContractAddress)
							setUseDefault(true)
						}}>
							Use Default?
						</StyledButton>
						<StyledButton onClick={() => setUseDefault(false)}>Use Custom Address</StyledButton>
					</Col>
				</Form.Row>
				<hr></hr>
				<Form.Row>
					<Form.Group as={Col}>
						<Col>
							<Form.Label>
								<SubHeading>Amount</SubHeading>
							</Form.Label>
						</Col>
						<Col md={6}>
							<Form.Control type="text" onKeyUp={(e: any) => { setAmount(e.target.value) }} />
						</Col>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col}>
						<Col>
							<StyledButton onClick={async (e: any) => {
								e.preventDefault();
								await processTransaction(e, recipientAddress, amount, ethInstance, setCompletedTransaction)
							}}>
								Submit Deposit
					</StyledButton>
						</Col>
					</Form.Group>
				</Form.Row>
			</Form>
		</Wrapper>
	</DepositsContainer>)

}
