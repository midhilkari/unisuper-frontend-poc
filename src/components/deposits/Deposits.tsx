import React, {useState, Dispatch, SetStateAction} from 'react';
import styled from 'styled-components';
import {Row, Col, Form, FormCheck, Button} from 'react-bootstrap';

import {transferETHtoContract} from '../../actions/metamask/index';

const DepositsContainer = styled.div`
	margin-left: 10%;
	margin-top: 1%;
	font-weight: bold;
	width: 40%;
`;


const StyledRow = styled(Row)`
	padding: 2%;
`;

const ColLabel = styled(Col)`

`;

const ColVal = styled(Col)`
	text-align: right;
`;

const processTransaction = async(e: any,
	recipientAddress: string,
	amount: string,
	ethInstance: any,
	setCompletedTransaction: Dispatch<SetStateAction<any>>) => {
		console.warn({proEth: ethInstance})

		const wei = parseInt(amount)
		console.warn(amount)
		await transferETHtoContract(ethInstance, recipientAddress, wei);
}

export default ({username, accountContractAddress, ethInstance, isMocked}: {username: string | boolean, accountContractAddress: string, ethInstance: any, isMocked: boolean}) => {
	console.warn({depEth: ethInstance})
	const [recipientAddress, setRecipientAddress] = useState('');
	const [useDefault, setUseDefault] = useState(false)
	const [amount, setAmount] = useState('');
	const [completedTransaction, setCompletedTransaction] = useState([]);

	return (<DepositsContainer>
    <Form>
		<Form.Row>
			<Form.Label>Account Address</Form.Label>
			{
				useDefault?
				<Form.Label>{accountContractAddress}</Form.Label>
				:
				<Form.Control
					type="text"
					onKeyUp={(e: any) => { setRecipientAddress(e.target.value)}}
					/>

			}
			<Button onClick={() => {
				setRecipientAddress(accountContractAddress)
				setUseDefault(true)}}>
				Use Default?
			</Button>
			<Button onClick={() => setUseDefault(false)}>Use Custom Address</Button>
		</Form.Row>
		<Form.Row>
			<Form.Label>Amount</Form.Label>
			<Form.Control type="text" onKeyUp={(e: any) => { setAmount(e.target.value)}}/>
		</Form.Row>
		<Form.Row>
			<Button onClick={async(e: any)=>{
				e.preventDefault();
				await processTransaction(e, recipientAddress, amount, ethInstance, setCompletedTransaction)
				}}>
				Submit Deposit
			</Button>
		</Form.Row>
    </Form>
	</DepositsContainer>)

}
