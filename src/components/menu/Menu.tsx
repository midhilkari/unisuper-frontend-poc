import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import {ReactComponent as AccountIcon} from '../../assets/icons/account_circle.svg';
import {Button} from 'react-bootstrap';

const MenuContainer = styled.div``;

const InformationContainer = styled.div`
	display: flex;
	height: 20vh;
	width: 40vw;
	margin-left: 10%;
	align-items: center;
	justify-content: space-between;
`;

const NameContainer = styled.div`
	display: flex;
	align-items: center;
`;


const StyledButton = styled(Button)`
	width: 15%;
	background-color: steelblue;
	:hover{
		background-color: royalblue;
	}
	border: none;
	padding: 10px;
	border-radius: 10px;
`;


const StyledAccountIcon = styled(AccountIcon)`
	height: 3rem;
	width: 3rem;
	margin-right: 5%;
`;

const AccountName = styled.div`
	margin-left: 1%;
	font-size: 1.5em;
	font-weight: bold;

`;

const ButtonContainer = styled.div`
	margin-left: 10%;
	width: 100%;
	height: 10%;
`;

const SummarySelector = styled(Button)`
	width: 13%;
	background-color: #cfcfcf;
	color: #818181;
	margin-right: 5px;
	border: none;
	::active {
		background-color: #2e73ab;
	}
`;
const ContributionSelector = styled(Button)`
	width: 13%;
	background-color: #cfcfcf;
	color: #818181;
	margin-right: 5px;
	border: none;
	::active {
		background-color: #2e73ab;
	}
`;
const TransferSelector = styled(Button)`
	width: 13%;
	background-color: #cfcfcf;
	color: #818181;
	margin-right: 5px;
	border: none;
	::active {
		background-color: #2e73ab;
	}
`;

type Menu = {
	loggedInUsername: string | boolean,
	selectedMenu: string,
	setSelectedMenu: Dispatch<SetStateAction<string>>,
	setLoggedIn: Dispatch<SetStateAction<string | boolean>>
}

type ClickEvent = {
	e: any,
	selection: string,
	state: Dispatch<SetStateAction<string>>;
}

const handleClick = ({e, selection, state}: ClickEvent) => {
	e.preventDefault();

}

export default ({loggedInUsername, selectedMenu, setSelectedMenu, setLoggedIn}: Menu) => (
	<MenuContainer>
		<InformationContainer>
			<NameContainer>
				<StyledAccountIcon></StyledAccountIcon>
				<AccountName>
					{loggedInUsername}
				</AccountName>
			</NameContainer>
			<StyledButton onClick={() => { setLoggedIn(false) }}>Log Out</StyledButton>
		</InformationContainer>
		<ButtonContainer>
			<SummarySelector
				active={selectedMenu === 'Account'? true: false}
				onClick={()=>setSelectedMenu('Account')}>Account Summary</SummarySelector>
			<ContributionSelector
				active={selectedMenu === 'Contributions'? true: false}
				onClick={()=>setSelectedMenu('Contributions')}>Contributions</ContributionSelector>
			<TransferSelector
				active={selectedMenu === 'Transfers'? true: false}
				onClick={()=>setSelectedMenu('Transfers')}>Transfer in</TransferSelector>
		</ButtonContainer>
	</MenuContainer>
)
