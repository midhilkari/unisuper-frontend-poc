import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import {ReactComponent as AccountIcon} from '../../assets/icons/account_circle.svg';
import {Button} from 'react-bootstrap';

const MenuContainer = styled.div``;

const NameContainer = styled.div`
	display: flex;
	height: 10vh;
	width: 100vw;
	align-items: center;
`;

const StyledAccountIcon = styled(AccountIcon)`
	margin-left: 10%;
	height: 3rem;
	width: 3rem;
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
	accountName: string,
	selectedMenu: string,
	setSelectedMenu: Dispatch<SetStateAction<string>>
}

type ClickEvent = {
	e: any,
	selection: string,
	state: Dispatch<SetStateAction<string>>;
}

const handleClick = ({e, selection, state}: ClickEvent) => {
	e.preventDefault();

}

export default ({accountName, selectedMenu, setSelectedMenu}: Menu) => (
	<MenuContainer>
		<NameContainer>
			<StyledAccountIcon></StyledAccountIcon>
			<AccountName>
				{accountName}
			</AccountName>
		</NameContainer>
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
