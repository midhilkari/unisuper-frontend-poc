import React from 'react';
import styled from 'styled-components';
import { Row, Col, Form, FormCheck, Container } from 'react-bootstrap';

const ContributionsContainer = styled(Container)`
	/* margin-left: 10%; */
	margin-top: 2%;
	/* font-weight: bold;
	width: 75%; */
`;

const StyledRow = styled(Row)`
	padding: 2%;
`;

const Wrapper = styled.div`
	padding: 30px;
	border-radius: 10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const findFundName = (address: string | boolean, isMocked: boolean): string => {
	if (isMocked) return 'UNISUPER';
	else return 'invalid';
}

const getTransferAmount = (address: string | boolean, isMocked: boolean) => {
	if (isMocked) return '$100,000.00';
	else return 'invalid';
}

const getTransferAccount = (address: string | boolean, isMocked: boolean) => {
	if (isMocked) return '0x00001231420000123142';
	else return 'invalid';
}


export default ({ username, isMocked }: { username: string | boolean, isMocked: boolean }) => {

	const fundName = findFundName(username, isMocked);
	const transferAmount = getTransferAmount(username, isMocked);
	const transferAccount = getTransferAccount(username, isMocked);


	return (<ContributionsContainer>
		<Wrapper>
			<Form>
				<StyledRow>
					<Col>Find Fund</Col>
					<Col>{fundName}</Col>
				</StyledRow>
				<StyledRow>
					<Col>Transfer Amount</Col>
					<Col>{transferAmount}</Col>
				</StyledRow>
				<StyledRow>
					<Col>Transfer Account</Col>
					<Col>{transferAccount}</Col>
				</StyledRow>
			</Form>
		</Wrapper>
	</ContributionsContainer>)

}
