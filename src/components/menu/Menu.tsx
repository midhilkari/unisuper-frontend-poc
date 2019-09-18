import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ReactComponent as AccountIcon } from '../../assets/icons/account-icon.svg';
import { Button, Container, Col, Row } from 'react-bootstrap';

const MenuContainer = styled(Container)`
	margin-top: 50px;
`;

const InformationContainer = styled.div`
	display: flex;
	height: 20vh;
	width: 40vw;
	/* margin-left: 10%; */
	align-items: center;
	justify-content: space-between;
`;

const NameContainer = styled.div`
	display: flex;
	align-items: center;
`;


const StyledButton = styled(Button)`
	width: 30%;
	background-color: steelblue;
	:hover{
		background-color: royalblue;
	}
	border: none;
	padding: 10px;
	border-radius: 10px;
	margin-right: 5px;
`;


const StyledAccountIcon = styled(AccountIcon)`
	height: 3rem;
	width: 100%;
	margin-right: 5%;
`;

const AccountName = styled.div`
	font-size: 2em;
	font-weight: lighter;
	vertical-align: center;

`;

const ButtonContainer = styled.div`
	margin-left: 10%;
	width: 100%;
	height: 10%;
`;

const SummarySelector = styled(Button)`
	width: 15%;
	background-color: steelblue;
	color: #F8F8FF;
	margin-right: 5px;
	border: none;
	::active {
		background-color: steelblue;
	}
`;
const DepositSelector = styled(Button)`
	width: 13%;
	background-color: steelblue;
	color: #F8F8FF;
	margin-right: 5px;
	border: none;
	::active {
		background-color: #2e73ab;
	}
`;
const WithdrawalSelector = styled(Button)`
	width: 13%;
	background-color: steelblue;
	color: #F8F8FF;
	margin-right: 5px;
	border: none;
	::active {
		background-color: #2e73ab;
	}
`;

const CenterAlign = styled.div`
	text-align: center;
	align-items: center;
`;

const RightAlign = styled.div`
	text-align: right;
	align-items: right;
`;

const StyledRow = styled(Row)`
	margin-top: 5%;
	margin-left: 0px;
`;

type Menu = {
	loggedInUsername: string | boolean,
	selectedMenu: string,
	setSelectedMenu: Dispatch<SetStateAction<string>>,
	setLoggedIn: Dispatch<SetStateAction<string | boolean>>,
	setSelectedAccount: Dispatch<SetStateAction<string | null>>,
}

type ClickEvent = {
	e: any,
	selection: string,
	state: Dispatch<SetStateAction<string>>;
}

const handleClick = ({ e, selection, state }: ClickEvent) => {
	e.preventDefault();

}

export default ({ loggedInUsername, selectedMenu, setSelectedMenu, setLoggedIn, setSelectedAccount }: Menu) => (
	<MenuContainer>
		<Row>
			<Col md={1}><StyledAccountIcon></StyledAccountIcon></Col>
			<Col md={7}>
				<AccountName>
					Welcome {loggedInUsername}!
				</AccountName>
			</Col>
			<Col md={4}>
				<RightAlign>
					<StyledButton onClick={() => { setLoggedIn(false) }}>Log Out</StyledButton>
					<StyledButton onClick={() => { setSelectedAccount(null) }}>Back</StyledButton>
				</RightAlign>
			</Col>
		</Row>
		<hr></hr>
		<StyledRow>
			<SummarySelector
				active={selectedMenu === 'Account' ? true : false}
				onClick={() => setSelectedMenu('Account')}>Account Summary</SummarySelector>
			<DepositSelector
				active={selectedMenu === 'Deposits' ? true : false}
				onClick={() => setSelectedMenu('Deposits')}>Deposits</DepositSelector>
			<WithdrawalSelector
				active={selectedMenu === 'Withdrawals' ? true : false}
				onClick={() => setSelectedMenu('Withdrawals')}>Withdrawals</WithdrawalSelector>
		</StyledRow>
	</MenuContainer>
)
