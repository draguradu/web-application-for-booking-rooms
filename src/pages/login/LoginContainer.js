import React, { useState } from 'react';
import LoginComponent from './LoginComponent';
import { AuthService } from 'services';
import { Redirect } from 'react-router-dom';
import { useGlobalStateContext } from 'contexts';

function LoginContainer() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [open, setOpen]=useState(false);
    const [snackbarMessage, setSnackbarMessage]=useState('');
    const { setGlobalState } = useGlobalStateContext();

    const handleClose = () => {
        setOpen(false);
      };

    const onSubmit = async () => {
        const response = await AuthService.login({
            username,
            password
        });
        if(response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setGlobalState(globalState => ({ ...globalState, user: response.data.user }));
            setIsLogged(true);
        } else {
            // error
            setSnackbarMessage("Wrong username or password");
            setOpen(true);
        }
    }
    
    if (AuthService.isLoggedUser()) {
        return <Redirect to="/exams" />;
    }

    if(isLogged) {
        return <Redirect to="/exams" />
    }

    return (
        <LoginComponent
            setUsername={setUsername}
            setPassword={setPassword}
            onSubmit={onSubmit}
            open={open}
            snackbarMessage={snackbarMessage}
            handleClose={handleClose} />
    )
}

export default LoginContainer;
