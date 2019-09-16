import React, {useState, SetStateAction, Dispatch, useEffect} from 'react';
import {Jumbotron} from 'react-bootstrap';
import {ReactComponent as AddIcon} from '../../assets/icons/add_account.svg';
import {ReactComponent as AccountIcon} from '../../assets/icons/account_main.svg';
import styled from 'styled-components';

import {getEmployeeAccounts} from '../../actions/contracts/employee';
import {createNewAccount} from '../../actions/contracts/employee';


const JumbotronStyled = styled(Jumbotron)`
    width: 80%;
    margin-left:10%;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CallToAction = styled.div`
    font-weight: bold;
    font-size: 2rem;
    padding: 2%;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
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
    background-color: steelblue;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

type AccountSelector = {
    employeeContractAddress: string;
    employeeAccounts: Array<any>;
    ethInstance: any;
    setSelectedAccount: Dispatch<SetStateAction<string | null>>;
}

type AccountCreatorType = {
    employeeContractAddress: string;
    setAccounts: Dispatch<SetStateAction<any>>;
    ethInstance: any;
}

const CreateAccount = ({employeeContractAddress, setAccounts, ethInstance}: AccountCreatorType) => {
    return(<AddAccountIcon onClick={async() => {
        const arrayOfAccounts = await createNewAccount(employeeContractAddress, ethInstance);
        setAccounts(arrayOfAccounts);
    }}/>)
}

export default ({employeeContractAddress, ethInstance, setSelectedAccount}: AccountSelector) => {
    const [accounts, setAccounts] = useState([]);

    useEffect(()=>{
        console.warn({e: employeeContractAddress})
        if(employeeContractAddress.length > 0) {
            getEmployeeAccounts(employeeContractAddress, ethInstance).then(accounts => {
                console.warn({accounts});
                setAccounts(accounts);
            })
        }
    }, [employeeContractAddress]);

    return(<JumbotronStyled>
            <CallToAction>
                {accounts.length > 0? 'Select Account': 'Create New Account'}
            </CallToAction>
            {
                accounts.length > 0?
                <Grid>
                    {accounts.map(account => {
                        return <GridElement onClick={() => setSelectedAccount(account)}>
                            <StyledAccountIcon/>
                            <div>{account}</div>
                        </GridElement>
                    })}
                    <GridElement>
                        <CreateAccount employeeContractAddress={employeeContractAddress} setAccounts={setAccounts} ethInstance={ethInstance}/>
                    </GridElement>
                </Grid>
                :
                <CreateAccount employeeContractAddress={employeeContractAddress} setAccounts={setAccounts} ethInstance={ethInstance}/>
            }
        </JumbotronStyled>)
}
