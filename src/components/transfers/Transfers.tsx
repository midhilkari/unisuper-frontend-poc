import React from 'react';
import styled from 'styled-components';
import {Row, Col, Form, FormCheck} from 'react-bootstrap';

const ContributionsContainer = styled.div`
	margin-left: 10%;
	margin-top: 1%;
	font-weight: bold;
	width: 75%;
`;

const StyledRow = styled(Row)`
	padding: 2%;
`;

const findFundName = (address:string, isMocked:boolean):string => {
	if(isMocked) return 'UNISUPER';
	else return 'invalid';
}

const getTransferAmount =  (address:string, isMocked:boolean) => {
	if(isMocked) return '$100,000.00';
	else return 'invalid';
}

const getTransferAccount =  (address:string, isMocked:boolean) => {
	if(isMocked) return '0x00001231420000123142';
	else return 'invalid';
}


export default ({accountAddress, isMocked}: {accountAddress:string, isMocked: boolean}) => {

	const fundName = findFundName(accountAddress, isMocked);
	const transferAmount = getTransferAmount(accountAddress, isMocked);
	const transferAccount = getTransferAccount(accountAddress, isMocked);


	return (<ContributionsContainer>
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
	</ContributionsContainer>)

}
