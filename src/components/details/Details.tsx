import React, {useState, useEffect} from 'react';
import Account from '../account/Account';
import Deposits from '../deposits/Deposits';
import Withdrawals from '../withdrawals/Withdrawals';
import styled from 'styled-components';
import 'react-bootstrap';

import {getEmployeeContractAddress} from '../../actions/contracts/unisuper';

const DetailContained = styled.div`

`;


type Details = {
    selectedMenu: string,
    ethInstance: any,
    accountContractAddress: string,
    username: any
}

type Selector = {
    [key: string]: React.FC<{username: string, ethInstance: any, isMocked: boolean, employeeContract: string}> |
        React.FC<{username: string, accountContractAddress: string, ethInstance: any, isMocked: boolean, employeeContract: string}> |
        React.FC<{username: string, accountContractAddress: string, isMocked: boolean, employeeContract: string}>
}
export default ({selectedMenu, ethInstance, accountContractAddress, username}:Details) => {

    const [employeeContract, setEmployeeContract] = useState();

    useEffect(()=>{
        getEmployeeContractAddress(username).then(setEmployeeContract)
    }, []);

    const selector: Selector = {
        "Account": Account,
        "Deposits": Deposits,
        "Withdrawals": Withdrawals,
    }

    const SelectedComponent: React.FC<{username: string, ethInstance: any, accountContractAddress: string, isMocked: boolean, employeeContract: string}> = selector[selectedMenu];

    console.log("Test");

    return (<DetailContained>
        <SelectedComponent
            ethInstance={ethInstance}
            username={username}
            accountContractAddress={accountContractAddress}
            isMocked={true}
            employeeContract={employeeContract}/>
    </DetailContained>)
}
