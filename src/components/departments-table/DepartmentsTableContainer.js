import React, { useState, useEffect } from 'react';
import DepartmentsTableComponent from './DepartmentsTableComponent';
import { AdminServices } from 'services';

function DepartmentsTableContainer() {
    const [departments, setDepartments]=useState([]);
    const [name, setName]=useState();
    const [open, setOpen]=useState(false);
    const [snackbarMessage, setSnackbarMessage]=useState('');
    const [dialog, setDialog]=useState(false);
    const [selectedId, setSelectedId]=useState();

    const handleClose = () => {
        setOpen(false);
      };

      const handleDialogClose = () => {
          setDialog(false);
      } 

    useEffect(() => {
        getAllDepartments();
    }, [])

    async function getAllDepartments(){
        const response = await AdminServices.getAllDepartments();
        if(response.status===200){
            setDepartments(response.data.departments);
        } else {
            //error
        }
    }

    const onAdd = async ()=>{
        const response = await AdminServices.addEntityToTable({
            name
        },"departments");
        if(response.status===200){
            setSnackbarMessage("Department added!");
            setOpen(true);
            getAllDepartments();
        }
        setDialog(false)
    }

    const onClickAction = (department) => {
        setName(department ? department.name : '');
        setDialog(true);
        setSelectedId(department ? department.id : -1);
    }

    const onEdit = async ()=>{
        const response = await AdminServices.editEntityFromTable(selectedId, {
            name,
        },"departments");
        if(response.status===200){
            setSnackbarMessage("Department edited!");
            setOpen(true);
            getAllDepartments();
        }
        setDialog(false)
    }

    const onDelete = async(id)=>{
        const response = await AdminServices.deleteEntityFromTable(id,"departments");
        if(response.status===200){
            setSnackbarMessage("Department deleted!");
            setOpen(true);
            getAllDepartments();
        }
    }

    return (
        <DepartmentsTableComponent 
        departments={departments}
        name={name}
        setName={setName}
        selectedId={selectedId}
        onAdd={onAdd}
        onClickAction={onClickAction}
        onEdit={onEdit}
        onDelete={onDelete}
        open={open}
        dialog={dialog}
        handleDialogClose={handleDialogClose}
        snackbarMessage={snackbarMessage}
        handleClose={handleClose} />
    )
}

export default DepartmentsTableContainer;
