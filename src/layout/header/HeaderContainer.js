import React, { useState } from 'react';
import HeaderComponent from './HeaderComponent';
import { Redirect } from 'react-router-dom';
import { AuthService } from 'services';

function HeaderContainer() {
    const [isLogout, setIsLogout] = useState(false);

    const onLogout = () => {
        AuthService.logout();
        setIsLogout(true);
    }

    if(isLogout) {
        return <Redirect to="/login" />
    }

    return (
        <HeaderComponent onLogout={onLogout} />
    )
}

export default HeaderContainer;
