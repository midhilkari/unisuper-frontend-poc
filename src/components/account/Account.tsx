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

const getAccounts = (address:string | boolean, isMocked:boolean):string => {
	if(isMocked) return 'BDAY56580';
	else return 'invalid';
}

const getInterest =  (address:string | boolean, isMocked:boolean) => {
	if(isMocked) return '$0.0';
	else return 'invalid';
}

const getMemberContributions =  (address:string | boolean, isMocked:boolean) => {
	if(isMocked) return '$0.0';
	else return 'invalid';
}

const getEmployerContributions =  (address:string | boolean, isMocked:boolean) => {
	if(isMocked) return '$0.0';
	else return 'invalid';
}

const getNetAccountBalance =  (address:string | boolean, isMocked:boolean) => {
	if(isMocked) return '$0.0';
	else return 'invalid';
}

export default ({username, isMocked}: {username: string | boolean, isMocked: boolean}) => {

	const accountNumber = getAccounts(username, isMocked);
	const interestEarned = getInterest(username, isMocked);
	const memberContributions = getMemberContributions(username, isMocked);
	const employerContributions = getEmployerContributions(username, isMocked);
	const accountBalance = getNetAccountBalance(username, isMocked);


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
