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

const getContributionType = (address:string, isMocked:boolean):string => {
	if(isMocked) return 'Employer Contribution';
	else return 'invalid';
}

const getCalculationBasis =  (address:string, isMocked:boolean) => {
	if(isMocked) return 'Voluntary';
	else return 'invalid';
}

const getExclusions =  (address:string, isMocked:boolean) => {
	if(isMocked) return 'No Limit';
	else return 'invalid';
}

const getThreshhold =  (address:string, isMocked:boolean) => {
	if(isMocked) return 'Calculate Unavailable: Pay period not initiated';
	else return 'invalid';
}


export default ({accountAddress, isMocked}: {accountAddress:string, isMocked: boolean}) => {

	const contributionType = getContributionType(accountAddress, isMocked);
	const calculationBasis = getCalculationBasis(accountAddress, isMocked);
	const exclusionType = getExclusions(accountAddress, isMocked);
	const threshold = getThreshhold(accountAddress, isMocked);


	return (<ContributionsContainer>
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
	</ContributionsContainer>)

}
