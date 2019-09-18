import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';
import BN from 'bn.js'
import { getAccountStatus, getAccountType, getNetBalance, getPayoutFrequency, getRewardSize, getTimeTillReward } from '../../actions/contracts/account';

const AccountContainer = styled(Container)`
	/* margin-left: 10%; */
	margin-top: 2%;
	/* font-weight: bold;
	width: 40%; */
`;

const StyledRow = styled(Row)`
	padding: 2%;
`;

const ColLabel = styled(Col)`

`;

const ColVal = styled(Col)`
	text-align: right;
`;

const Wrapper = styled.div`
	padding: 30px 50px 30px 50px;
	border-radius: 10px;
	/* border: solid lightgray; */
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Seperator = styled.hr`
	margin: 0px;
`;

const SubHeading = styled.label`
	color: #696969;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1em;
	font-weight: bold;
`;

const Values = styled.label`
	color: steelblue;
	font-family: 'Courier New', Courier, monospace;
	font-size: 1em;
	font-weight: bold;
`;

export default ({ username, accountContractAddress, isMocked }: { username: string | boolean, accountContractAddress: string, isMocked: boolean }) => {

	const [netBalance, setNetBalance] = useState('0');
	const [accountType, setAccountType] = useState('');
	const [accountStatus, setAccountStatus] = useState('');
	const [timeTillReward, setTimeTillReward] = useState(0);
	const [rewardSize, setRewardSize] = useState(0);
	const [payoutFrequency, setPayoutFrequency] = useState(0);

	useEffect(() => {
		getNetBalance(accountContractAddress).then(netBal => {
			const base = new BN(14)
			const weiConverter = new BN(10).pow(base);
			const preEthDecimal = new BN(netBal).div(weiConverter).toString(10);
			const eth = [preEthDecimal.slice(0, 1), ".", preEthDecimal.slice(1)].join("") + " ETH";
			setNetBalance(eth)
		});

		getAccountType(accountContractAddress).then(accTypeBN => {
			switch(accTypeBN.toNumber()){
				case(1):
					setAccountType('Accumulation 2');
				case(2):
					setAccountType('Defined Benefit Division');
				case(3):
					setAccountType('Personal Account');
				case(4):
					setAccountType('Pension');
				default:
					setAccountType('Accumulation1');
			}
		});
		getAccountStatus(accountContractAddress).then(accStatusBN => {
			switch (accStatusBN.toNumber()) {
				case (1):
					setAccountStatus('CLOSED');
				default:
					setAccountStatus('OPEN');
			}
		});
		getTimeTillReward(accountContractAddress).then(ttrBN => setTimeTillReward(ttrBN.toNumber()));
		getRewardSize(accountContractAddress).then(rsBN => setRewardSize(rsBN.toNumber()));
		getPayoutFrequency(accountContractAddress).then(pfreqBN => setPayoutFrequency(pfreqBN.toNumber()));
	}, []);

	return (<AccountContainer>
		<Wrapper>
			<StyledRow>
				<SubHeading>Account Address</SubHeading>
				<ColVal>
					<Values>{accountContractAddress}</Values>
				</ColVal>
			</StyledRow>
			<Seperator></Seperator>
			<StyledRow>
				<SubHeading>Account Type</SubHeading>
				<ColVal>
					<Values>{accountType}</Values>
				</ColVal>
			</StyledRow>
			<Seperator></Seperator>
			<StyledRow>
				<SubHeading>AccountStatus</SubHeading>
				<ColVal>
					<Values>{accountStatus}</Values>
				</ColVal>
			</StyledRow>
			<Seperator></Seperator>
			<StyledRow>
				<SubHeading>Net Balance</SubHeading>
				<ColVal>
					<Values>{netBalance}</Values>
				</ColVal>
			</StyledRow>
			<Seperator></Seperator>
			<StyledRow>
				<SubHeading>Time Till Reward</SubHeading>
				<ColVal>
					<Values>{rewardSize}</Values>
				</ColVal>
			</StyledRow>
			<Seperator></Seperator>
			<StyledRow>
				<SubHeading>Reward Size</SubHeading>
				<ColVal>
					<Values>{rewardSize}</Values>
				</ColVal>
			</StyledRow>
			<Seperator></Seperator>
			<StyledRow>
				<SubHeading>Payout Frequency</SubHeading>
				<ColVal>
					<Values>{payoutFrequency}</Values>
				</ColVal>
			</StyledRow>
		</Wrapper>
	</AccountContainer>)

}
