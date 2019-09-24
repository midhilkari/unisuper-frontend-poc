import React, { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { Jumbotron, Alert, Button, Col, Row } from 'react-bootstrap';
import { ReactComponent as AddIcon } from '../../assets/icons/plus-black-symbol.svg';
import { ReactComponent as AccountIcon } from '../../assets/icons/cash.svg';
import styled from 'styled-components';

import { getEmployeeAccounts } from '../../actions/contracts/employee';
import { createNewAccount } from '../../actions/contracts/employee';


const JumbotronStyled = styled(Jumbotron)`
    width: 80%;
    margin-left:10%;
    margin-top: 5%;
    display: block;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 0px;
    padding-left: 70px;
    padding-right: 70px;
`;

const CallToAction = styled.div`
    font-weight: normal;
    font-size: 2.5rem;
    padding: 2%;
    color: #696969;
	font-family: Arial, Helvetica, sans-serif;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
`;

const AddAccountIcon = styled(AddIcon)`
    height: 4em;
    width: 4em;
`;

const StyledAccountIcon = styled(AccountIcon)`
    height: 4em;
    width: 4em;
`;

const GridElement = styled.div`
    background-color: white;
    /* border: solid palevioletred; */
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5%;
    height: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const AdreessLabel = styled.label`
	background: transparent;
	border-radius: 3px;
	border: 2px solid steelblue;
	color: steelblue;
	padding: 0.25em 1em;
	font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    margin-top: 5px;
`;

const StyledButton = styled(Button)`
	/* width: 30%; */
	background-color: steelblue;
	:hover{
		background-color: royalblue;
	}
	border: none;
	padding: 10px;
	border-radius: 10px;
`;

const RightAlign = styled.div`
	text-align: right;
	align-items: right;
`;

const LeftAlign = styled.div`
	text-align: left;
	align-items: left;
`;

type AccountSelector = {
    employeeContractAddress: string;
    employeeAccounts: Array<any>;
    ethInstance: any;
    setSelectedAccount: Dispatch<SetStateAction<string | null>>;
    setEmployeeSettings: Dispatch<SetStateAction<boolean>>;
}

type AccountCreatorType = {
    employeeContractAddress: string;
    setAccounts: Dispatch<SetStateAction<any>>;
    ethInstance: any;
}

const CreateAccount = ({ employeeContractAddress, setAccounts, ethInstance }: AccountCreatorType) => {
    return (<AddAccountIcon onClick={async () => {
        const arrayOfAccounts = await createNewAccount(employeeContractAddress, ethInstance);
        setAccounts(arrayOfAccounts);
    }} />)
}

export default ({ employeeContractAddress, ethInstance, setSelectedAccount, setEmployeeSettings }: AccountSelector) => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        console.warn({ e: employeeContractAddress })
        if (employeeContractAddress.length > 0) {
            getEmployeeAccounts(employeeContractAddress, ethInstance).then(accounts => {
                console.warn({ accounts });
                setAccounts(accounts);
            })
        }
    }, [employeeContractAddress]);

    return (<JumbotronStyled>
        <CallToAction>
            <Row>
                <Col>
                    <LeftAlign>
                        {accounts.length > 0 ? 'Select Account' : 'Create New Account'}
                    </LeftAlign>
                </Col>
                <Col>
                    <RightAlign>
                        <StyledButton onClick={() => setEmployeeSettings(true)}>Employee Settings</StyledButton>
                    </RightAlign>
                </Col>
            </Row>

            <hr></hr>
        </CallToAction>
        {
            accounts.length > 0 ?
                <Grid>
                    {accounts.map(account => {
                        return <GridElement onClick={() => setSelectedAccount(account)}>
                            <StyledAccountIcon />
                            <AdreessLabel>{account}</AdreessLabel>
                        </GridElement>
                    })}
                    <GridElement>
                        <CreateAccount employeeContractAddress={employeeContractAddress} setAccounts={setAccounts} ethInstance={ethInstance} />
                    </GridElement>
                </Grid>
                :
                <CreateAccount employeeContractAddress={employeeContractAddress} setAccounts={setAccounts} ethInstance={ethInstance} />
        }
    </JumbotronStyled>)
}
