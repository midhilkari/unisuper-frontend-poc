import React from 'react';
import styled from 'styled-components';
import {Row, Col, Form, FormCheck} from 'react-bootstrap';

const DepositsContainer = styled.div`
	margin-left: 10%;
	margin-top: 1%;
	font-weight: bold;
	width: 75%;
`;

const StyledRow = styled(Row)`
	padding: 2%;
`;

const getContributionType = (address: string | boolean, isMocked:boolean):string => {
	if(isMocked) return 'Employer Contribution';
	else return 'invalid';
}

const getCalculationBasis =  (address: string | boolean, isMocked:boolean) => {
	if(isMocked) return 'Voluntary';
	else return 'invalid';
}

const getExclusions =  (address: string | boolean, isMocked:boolean) => {
	if(isMocked) return 'No Limit';
	else return 'invalid';
}

const getThreshhold =  (address: string | boolean, isMocked:boolean) => {
	if(isMocked) return 'Calculate Unavailable: Pay period not initiated';
	else return 'invalid';
}


export default ({username, isMocked}: {username: string | boolean, isMocked: boolean}) => {

	const contributionType = getContributionType(username, isMocked);
	const calculationBasis = getCalculationBasis(username, isMocked);
	const exclusionType = getExclusions(username, isMocked);
	const threshold = getThreshhold(username, isMocked);


	return (<DepositsContainer>
    <Form>
      <StyledRow>
        <Col>Contribution Type</Col>
        <Col>{contributionType}</Col>
      </StyledRow>
      <StyledRow>
        <Col>Calculation Basis</Col>
        <Col>{calculationBasis}</Col>
      </StyledRow>
      <StyledRow>
        <Col>Exclusions</Col>
        <Col>{exclusionType}</Col>
      </StyledRow>
      <StyledRow>
        <Col>Threshold</Col>
        <Col>{threshold}</Col>
      </StyledRow>
    </Form>
	</DepositsContainer>)

}
