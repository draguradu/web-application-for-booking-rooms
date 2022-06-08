import React, { useState, useEffect } from 'react';
import UsersTableComponent from './UsersTableComponent';
import { AdminServices } from 'services';

function UsersTableContainer() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [yearsOfStudy, setYearsOfStudy] = useState();
    const [specializations,setSpecializations]=useState([]);
    const [selectedSpecialization, setSelectedSpecialization]=useState();
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState();
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [dialog, setDialog] = useState(false);
    const [selectedId, setSelectedId] = useState();

    const handleClose = () => {
        setOpen(false);
      };

      const handleDialogClose = () => {
          setDialog(false);
      } 

    useEffect(() => {
        getAllUsers();
    }, [])

    async function getAllUsers(){
        const response = await AdminServices.getAllUsers();
        if(response.status===200){
            response.data.users.map(user => {
                user.year = user.yearsOfStudy;
                user.roleName = user.role.name;
                user.specializationName = user.specialization.name;
                return null;
            })
            setUsers(response.data.users);
        } else {
            //error
        }
    }

    useEffect(() => {
        async function getAllSpecializations(){
            const response = await AdminServices.getAllSpecializations();
            if(response.status===200){
                setSpecializations(response.data.specializations);
            } else{
                //error
            }
        }
        getAllSpecializations();
    }, [])

    useEffect(()=>{
        async function getRoles(){
            const response = await AdminServices.getRoles();
            if(response.status===200){
                setRoles(response.data.roles);
            } else{
                //error
            }
        }
        getRoles();
    }, [])

    const onAdd = async ()=>{
        const response = await AdminServices.addEntityToTable({
            name,
            username,
            password,
            yearsOfStudy,
            specialization:selectedSpecialization,
            role:selectedRole
        },"users");
        if(response.status===200){
            setSnackbarMessage("User added!");
            setOpen(true);
            getAllUsers();
        }
        setDialog(false)
    }

    const onClickAction = (user) => {
        setName(user ? user.name : '');
        setUsername(user ? user.username : '');
        setPassword(user ? user.password : '');
        setYearsOfStudy(user ? user.yearsOfStudy : '');
        setSelectedSpecialization(user ? user.specialization.id : '');
        setSelectedRole(user ? user.role.id : '');
        setDialog(true);
        setSelectedId(user ? user.id : -1);
    }

    const onEdit = async ()=>{
        const response = await AdminServices.editEntityFromTable(selectedId, {
            name,
            username,
            password,
            yearsOfStudy,
            specialization:selectedSpecialization,
            role:selectedRole
        },"users");
        if(response.status===200){
            setSnackbarMessage("User edited!");
            setOpen(true);
            getAllUsers();
        }
        setDialog(false)
    }

    const onDelete = async(id)=>{
        const response = await AdminServices.deleteEntityFromTable(id,"users");
        if(response.status===200){
            setSnackbarMessage("User deleted!");
            setOpen(true);
            getAllUsers();
        }
    }

    return (
        <UsersTableComponent 
        users={users}
        name={name}
        setName={setName}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        yearsOfStudy={yearsOfStudy}
        setYearsOfStudy={setYearsOfStudy}
        specializations={specializations}
        selectedSpecialization={selectedSpecialization}
        setSelectedSpecialization={setSelectedSpecialization}
        roles={roles}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedId={selectedId}
        onAdd={onAdd}
        onClickAction={onClickAction}
        onEdit={onEdit}
        onDelete={onDelete}
        open={open}
        dialog={dialog}
        handleDialogClose={handleDialogClose}
        snackbarMessage={snackbarMessage}
        handleClose={handleClose}  />
    )
}

export default UsersTableContainer;
