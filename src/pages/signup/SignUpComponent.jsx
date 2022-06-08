import React from 'react';
import { TextField, Button, InputLabel, Select, MenuItem, FormGroup, FormControl } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from "./SignUp.module.scss";
import { Link } from 'react-router-dom';

function SignUpComponent(props) {

    const {
        specializations,
        selectedSpecialization,
        setSelectedSpecialization,
        years,
        setName,
        setUsername,
        setPassword,
        setConfirmPassword,
        selectedYear,
        setSelectedYear,
        roles,
        selectedRole,
        setSelectedRole,
        onSubmit,
        isDisable
    } = props;

    return (
        <React.Fragment>
            <FormGroup className={styles.formGroup}>
                <TextField 
                    className={styles.itemForm}
                    label="Name"
                    variant="outlined"
                    onChange={e=>setName(e.target.value)}
                />
                <TextField 
                    className={styles.itemForm}
                    label="Username"
                    variant="outlined"
                    onChange={e=>setUsername(e.target.value)}
                />
                <TextField 
                    className={styles.itemForm}
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={e=>setPassword(e.target.value)}
                />
                <TextField 
                    className={styles.itemForm}
                    label="Confirm password"
                    type="password"
                    variant="outlined"
                    onChange={e=>setConfirmPassword(e.target.value)}
                />

                <FormControl variant="outlined" className={styles.itemForm}> 
                    <InputLabel id="signup-specialization">Specialization</InputLabel>
                    <Select
                        labelId="signup-specialization"
                        label="Specialization"
                        value={selectedSpecialization}
                        onChange={e=>setSelectedSpecialization(e.target.value)}
                    >
                    {
                        specializations.map((specialization, index)=>(
                            <MenuItem key={index} value={specialization.id}>{specialization.name}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={styles.itemForm}> 
                    <InputLabel id="signup-yearOfStudy">Year of study</InputLabel>
                    <Select
                        labelId="signup-yearOfStudy"
                        label="Year of study"
                        value={selectedYear}
                        onChange={e => setSelectedYear(e.target.value) }
                    >
                    {[...Array(years).keys()].map((number) => (
                        <MenuItem key={number} value={number+1}>
                            {number+1}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={styles.itemForm}> 
                    <InputLabel id="signup-role">Role</InputLabel>
                    <Select
                        labelId="signup-role"
                        label="Role"
                        value={selectedRole}
                        onChange={e=>setSelectedRole(e.target.value)}
                    >
                    {
                        roles.map((selectedRole, index)=>(
                            <MenuItem key={index} value={selectedRole.id}>{selectedRole.name}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>

                <Button
                    className={styles.itemForm + " " + styles.buttonSignup}
                    disabled={isDisable}
                    variant="contained" 
                    color="primary"
                    onClick={() => onSubmit()}
                >
                    Signup
                </Button>
                <br />
                <p>Already have an account ? <Link to="/login">LogIn</Link></p>
            </FormGroup>
        </React.Fragment>
    )
}

SignUpComponent.propTypes={
    specializations: PropTypes.array,
    selectedSpecialization: PropTypes.number,
    setSelectedSpecialization: PropTypes.func,
    years:PropTypes.number,
    selectedYear:PropTypes.number,
    setSelectedYear:PropTypes.func,
    setName:PropTypes.func,
    setUsername: PropTypes.func,
    setPassword: PropTypes.func,
    setConfirmPassword: PropTypes.func,
    selectedRole:PropTypes.array,
    setSelectedRole:PropTypes.func,
    roles:PropTypes.array,
    onSubmit: PropTypes.func,
    isDisable: PropTypes.bool
}

export default SignUpComponent;
