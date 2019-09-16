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
    username: any
}

type Selector = {
    [key: string]: React.FC<{username: string, isMocked: boolean, employeeContract: string}>
}
export default ({selectedMenu, username}:Details) => {

    const [employeeContract, setEmployeeContract] = useState();

    useEffect(()=>{
        getEmployeeContractAddress(username).then(setEmployeeContract)
    }, []);

    const selector: Selector = {
        "Account": Account,
        "Deposits": Deposits,
        "Withdrawals": Withdrawals,
    }

    const SelectedComponent: React.FC<{username: string, isMocked: boolean, employeeContract: string}> = selector[selectedMenu];

    console.log("Test");

    return (<DetailContained>
        <SelectedComponent username={username} isMocked={true} employeeContract={employeeContract}/>
    </DetailContained>)
}
