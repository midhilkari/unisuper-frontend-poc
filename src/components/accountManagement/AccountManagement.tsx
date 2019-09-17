import React, {Dispatch, SetStateAction, useState, useEffect} from 'react';
import Menu from '../menu/Menu';
import Details from '../details/Details';
import AccountSelector from '../accountSelector/AccountSelector';

import {getEmployeeAccounts} from '../../actions/contracts/employee';
import {getEmployeeContractAddress} from '../../actions/contracts/unisuper';

type AccountManagementType = {
    loggedInUsername: any;
    selectedMenu: string;
    ethInstance: any;
    setLoggedIn: Dispatch<SetStateAction<any>>;
    setSelectedMenu: Dispatch<SetStateAction<string>>;
}

export default ({loggedInUsername, selectedMenu, setSelectedMenu, setLoggedIn, ethInstance}: AccountManagementType) => {
    const [employeeAccounts, setEmployeeAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = React.useState<null | string>(null);
    const [employeeContractAddress, setEmployeeContractAddress] = useState('');

    useEffect(()=>{
        if(employeeContractAddress.length > 0) {
            getEmployeeAccounts(employeeContractAddress, ethInstance).then(accounts => {
                console.warn({accounts})
                setEmployeeAccounts(accounts)
            })
        }
        else {
            getEmployeeContractAddress(loggedInUsername).then(employeeAddress => {
                console.warn({employeeAddress})
                setEmployeeContractAddress(employeeAddress);
            })
        }
    }, [employeeContractAddress])

    if(selectedAccount !== null) {
        return(<div>
                    <Menu loggedInUsername={loggedInUsername}
                        selectedMenu={selectedMenu}
                        setSelectedMenu={setSelectedMenu}
                        setLoggedIn={setLoggedIn}/>
                    <Details selectedMenu={selectedMenu}
                        accountContractAddress={selectedAccount}
                        ethInstance={ethInstance}
                        username={loggedInUsername}/>
                </div>)
    } else {
        return(<AccountSelector employeeContractAddress={employeeContractAddress}
                setSelectedAccount={setSelectedAccount}
                employeeAccounts={employeeAccounts}
                ethInstance={ethInstance}/>)
    }
}
