import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-bootstrap';

import {getAccountStatus, getAccountType, getNetBalance, getPayoutFrequency, getRewardSize, getTimeTillReward} from '../../actions/contracts/account';

const AccountContainer = styled.div`
	margin-left: 10%;
	margin-top: 1%;
	font-weight: bold;
	width: 40%;
`;

const StyledRow = styled(Row)`
	padding: 2%;
`;

const ColLabel = styled(Col)`

`;

const ColVal = styled(Col)`
	text-align: right;
`;

export default ({username, accountContractAddress, isMocked}: {username: string | boolean, accountContractAddress:string, isMocked: boolean}) => {

	const [netBalance, setNetBalance] = useState(0);
	const [accountType, setAccountType] = useState('');
	const [accountStatus, setAccountStatus] = useState('');
	const [timeTillReward, setTimeTillReward] = useState(0);
	const [rewardSize, setRewardSize] = useState(0);
	const [payoutFrequency, setPayoutFrequency] = useState(0);

	useEffect(() => {
		getNetBalance(accountContractAddress).then(nb => setNetBalance(nb.toNumber()));
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
			switch(accStatusBN.toNumber()){
				case(1):
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
		<StyledRow>
			<ColLabel>Account Address</ColLabel>
			<ColVal>{accountContractAddress}</ColVal>
		</StyledRow>
		<StyledRow>
			<ColLabel>Account Type</ColLabel>
			<ColVal>{accountType}</ColVal>
		</StyledRow>
		<StyledRow>
			<ColLabel>AccountStatus</ColLabel>
			<ColVal>{accountStatus}</ColVal>
		</StyledRow>
		<StyledRow>
			<ColLabel>Net Balance</ColLabel>
			<ColVal>{netBalance}</ColVal>
		</StyledRow>
		<StyledRow>
			<ColLabel>Time Till Reward</ColLabel>
			<ColVal>{rewardSize}</ColVal>
		</StyledRow>
		<StyledRow>
			<ColLabel>Reward Size</ColLabel>
			<ColVal>{rewardSize}</ColVal>
		</StyledRow>
		<StyledRow>
			<ColLabel>Payout Frequency</ColLabel>
			<ColVal>{payoutFrequency}</ColVal>
		</StyledRow>
	</AccountContainer>)

}
