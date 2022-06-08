import React from 'react';
import { TextField, Button, FormGroup, Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from "./Login.module.scss";
import Alert from '@material-ui/lab/Alert';

function LoginComponent(props) {
    const {
        setUsername,
        setPassword,
        onSubmit,
        open,
        snackbarMessage,
        handleClose
    } = props;

    return (
        <React.Fragment>
             <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        <FormGroup className={styles.formGroup}>
            <TextField
                className={styles.itemForm}
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                className={styles.itemForm}
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                className={styles.itemForm + " " + styles.buttonLogin}
                variant="contained" 
                color="primary"
                onClick={() => onSubmit()}
            >
                Login
            </Button>
           
        </FormGroup>
        </React.Fragment>
    )
}

LoginComponent.propTypes={
    setUsername: PropTypes.func,
    setPassword: PropTypes.func,
    onSubmit: PropTypes.func,
    open: PropTypes.bool,
    snackbarMessage: PropTypes.string,
    handleClose: PropTypes.func
}

export default LoginComponent;
