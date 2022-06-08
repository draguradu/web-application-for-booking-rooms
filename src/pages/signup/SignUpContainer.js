import React, { useState, useEffect } from 'react';
import SignUpComponent from './SignUpComponent';
import { AuthService, FormExamsService, UserService } from 'services';
import { Redirect } from 'react-router-dom';

function SignUpContainer() {
    const [name, setName]=useState();
    const [username, setUsername]=useState();
    const [password, setPassword]=useState();
    const [confirmPassword, setConfirmPassword]=useState();
    const [years,setYears]=useState(0);
    const [selectedYear, setSelectedYear]=useState();
    const [specializations,setSpecializations]=useState([]);
    const [selectedSpecialization, setSelectedSpecialization]=useState();
    const [roles, setRoles]=useState([]);
    const [selectedRole, setSelectedRole]=useState();
    const [isSigned, setIsSigned]=useState(false);
    const [isDisable, setisDisable]=useState(true);

    useEffect(() => {
        async function getSpecializations(){
            const response = await FormExamsService.getSpecializations();
            if(response.status===200){
                setSpecializations(response.data.specializations);
            } else{
                //error
            }
        }
        getSpecializations();
    }, [])

    useEffect(() => {
        const checkValues = name && username && password && confirmPassword && selectedSpecialization && selectedYear && selectedRole;
        setisDisable(!checkValues);
    }, [name, username, password, confirmPassword, selectedSpecialization, selectedYear, selectedRole]);

    const getNumberOfYears =  async(id)=>{
        const response=await FormExamsService.getNumberOfYears(id);
            if(response.status===200){
                setYears(response.data.numberOfYears);
            } else{
                //error
            }
    }

    useEffect(() => {
        if(selectedSpecialization!==-1){
            getNumberOfYears(selectedSpecialization)
        }
    })

    useEffect(()=>{
        async function getRoles(){
            const response = await UserService.getRoles();
            if(response.status===200){
                setRoles(response.data.roles);
            } else {
                //error
            }
        }
        getRoles();
    },[])

    const onSubmit = async () => {
        if( password === confirmPassword ) {
            const response = await AuthService.signup({
                name,
                username,
                password,
                specialization: selectedSpecialization,
                yearOfStudy: selectedYear,
                role: selectedRole
            });
            if(response.status === 200){
                setIsSigned(true);
            } else {
                //error
            }
        } else {
            // error
        }
    }

    if (AuthService.isLoggedUser()) {
        return <Redirect to="/exams" />;
    }

    if(isSigned){
        return <Redirect to="/login" />
    }

    return (
        <SignUpComponent 
            setName={setName}
            setUsername={setUsername}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            specializations={specializations}
            selectedSpecialization={selectedSpecialization}
            setSelectedSpecialization={setSelectedSpecialization}
            years={years}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            roles={roles}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            onSubmit={onSubmit}
            isDisable={isDisable} />
    )
}

export default SignUpContainer;
