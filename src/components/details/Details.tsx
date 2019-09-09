import React from 'react';
import Account from '../account/Account';
import Contributions from '../contributions/Contributions';
import Transfers from '../transfers/Transfers';
import styled from 'styled-components';
import 'react-bootstrap';


const DetailContained = styled.div`

`;


type Details = {
    selectedMenu: string,
    accountAddress: string
}

type Selector = {
    [key: string]: React.FC<{accountAddress: string, isMocked: boolean}>
}
export default ({selectedMenu, accountAddress}:Details) => {

    const selector: Selector = {
        "Account": Account,
        "Contributions": Contributions,
        "Transfers": Transfers,
    }

    const SelectedComponent: React.FC<{accountAddress: string, isMocked: boolean}> = selector[selectedMenu];

    console.log("Test")
    return (<DetailContained>
        <SelectedComponent accountAddress={accountAddress} isMocked={true}/>
    </DetailContained>)
}
