import React, { useState, useEffect } from 'react';
import ProfessorsTableComponent from './ProfessorsTableComponent';
import { AdminServices } from 'services';

function ProfessorsTableContainer() {
    const [professors, setProfessors]=useState([]);
    const [name, setName]=useState([]);
    const [departments, setDepartments]=useState([]);
    const [selectedDepartment, setSelectedDepartment]=useState();
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
        getAllProfessors();
    }, [])

    async function getAllProfessors(){
        const response = await AdminServices.getAllProfessors();
        if(response.status===200){
            response.data.professors.map(professor => {
                professor.departmentName = professor.department.name;
                return null;
            });
            setProfessors(response.data.professors);
        } else {
            //error
        }
    }

    useEffect(() => {
        async function getAllDepartments(){
            const response = await AdminServices.getAllDepartments();
            if(response.status===200){
                setDepartments(response.data.departments);
            } else{
                //error
            }
        }
        getAllDepartments();
    }, [])

    const onAdd = async ()=>{
        const response = await AdminServices.addEntityToTable({
            name,
            department:selectedDepartment,
        },"professors");
        if(response.status===200){
            setSnackbarMessage("Subject added!");
            setOpen(true);
            getAllProfessors();
        }
        setDialog(false)
    }

    const onClickAction = (professor) => {
        setName(professor ? professor.name : '');
        setSelectedDepartment(professor ? professor.department.id : '');
        setDialog(true);
        setSelectedId(professor ? professor.id : -1);
    }

    const onEdit = async ()=>{
        const response = await AdminServices.editEntityFromTable(selectedId, {
            name,
            department:selectedDepartment,
        },"professors");
        if(response.status===200){
            setSnackbarMessage("Subject edited!");
            setOpen(true);
            getAllProfessors();
        }
        setDialog(false)
    }

    const onDelete = async(id)=>{
        const response = await AdminServices.deleteEntityFromTable(id,"professors");
        if(response.status===200){
            setSnackbarMessage("Professor deleted!");
            setOpen(true);
            getAllProfessors();
        }
    }

    return (
        <ProfessorsTableComponent 
        professors={professors} 
        name={name}
        setName={setName}
        departments={departments}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
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

export default ProfessorsTableContainer;
