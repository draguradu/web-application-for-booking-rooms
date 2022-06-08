import React, { useState, useEffect } from 'react';
import SpecializationsTableComponent from './SpecializationsTableComponent';
import { AdminServices } from 'services';

function SpecializationsTableContainer() {
    const [specializations, setSpecializations]=useState([]);
    const [name, setName]=useState();
    const [numberOfYears, setNumberOfYears]=useState();
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
        getAllSpecializations();
    }, [])


    useEffect(() => {
        getAllSpecializations();
    }, [])

    async function getAllSpecializations(){
        const response = await AdminServices.getAllSpecializations();
        if(response.status===200){
            setSpecializations(response.data.specializations);
        } else {
            //error
        }
    }

    const onAdd = async ()=>{
        const response = await AdminServices.addEntityToTable({
            name,
            numberOfYears
        },"specializations");
        if(response.status===200){
            setSnackbarMessage("Specialization added!");
            setOpen(true);
            getAllSpecializations();
        }
        setDialog(false)
    }

    const onClickAction = (specialization) => {
        setName(specialization ? specialization.name : '');
        setNumberOfYears(specialization ? specialization.numberOfYears : '');
        setDialog(true);
        setSelectedId(specialization ? specialization.id : -1);
    }

    const onEdit = async ()=>{
        const response = await AdminServices.editEntityFromTable(selectedId, {
            name,
            numberOfYears
        },"specializations");
        if(response.status===200){
            setSnackbarMessage("Specialization edited!");
            setOpen(true);
            getAllSpecializations();
        }
        setDialog(false)
    }

    const onDelete = async(id)=>{
        const response = await AdminServices.deleteEntityFromTable(id,"specializations");
        if(response.status===200){
            setSnackbarMessage("Specialization deleted!");
            setOpen(true);
            getAllSpecializations();
        }
    }

    return (
        <SpecializationsTableComponent 
        specializations={specializations} 
        name={name}
        setName={setName}
        numberOfYears={numberOfYears}
        setNumberOfYears={setNumberOfYears}
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

export default SpecializationsTableContainer;
