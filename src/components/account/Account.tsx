import React from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-bootstrap';

const AccountContainer = styled.div`
	margin-left: 10%;
	margin-top: 1%;
	font-weight: bold;
	width: 75%;
`;

const StyledRow = styled(Row)`
	padding: 2%;
`;

const getAccounts = (address:string, isMocked:boolean):string => {
	if(isMocked) return 'BDAY56580';
	else return 'invalid';
}

const getInterest =  (address:string, isMocked:boolean) => {
	if(isMocked) return '$0.0';
	else return 'invalid';
}

const getMemberContributions =  (address:string, isMocked:boolean) => {
	if(isMocked) return '$0.0';
	else return 'invalid';
}

const getEmployerContributions =  (address:string, isMocked:boolean) => {
	if(isMocked) return '$0.0';
	else return 'invalid';
}

const getNetAccountBalance =  (address:string, isMocked:boolean) => {
	if(isMocked) return '$0.0';
	else return 'invalid';
}

export default ({accountAddress, isMocked}: {accountAddress:string, isMocked: boolean}) => {

	const accountNumber = getAccounts(accountAddress, isMocked);
	const interestEarned = getInterest(accountAddress, isMocked);
	const memberContributions = getMemberContributions(accountAddress, isMocked);
	const employerContributions = getEmployerContributions(accountAddress, isMocked);
	const accountBalance = getNetAccountBalance(accountAddress, isMocked);


	return (<AccountContainer>
		<StyledRow>
			<Col>Account Number</Col>
			<Col>{accountNumber}</Col>
		</StyledRow>
		<StyledRow>
			<Col>Interest Earned On Contributions</Col>
			<Col>{interestEarned}</Col>
		</StyledRow>
		<StyledRow>
			<Col>Member Contributions</Col>
			<Col>{memberContributions}</Col>
		</StyledRow>
		<StyledRow>
			<Col>Employer Contributions</Col>
			<Col>{employerContributions}</Col>
		</StyledRow>
	</AccountContainer>)

}
