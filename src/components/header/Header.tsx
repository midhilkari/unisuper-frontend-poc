import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/uni-super.png';

const HeaderDiv = styled.div`
	height: 10vh;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #d6dadd;
`;

const UniSuper = styled.img`
	height: 100%;
	max-width: 100%;
	margin-left: 10%;
`;

const ContactDiv = styled.div`
	margin-right: 10%;
	font-weight: bold;
`;

export default () => (
	<HeaderDiv>
		<UniSuper src={Logo}/>
		<ContactDiv>Need Help? Call Us</ContactDiv>
	</HeaderDiv>
)
