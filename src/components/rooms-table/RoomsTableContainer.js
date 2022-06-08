import React, { useState, useEffect } from 'react';
import RoomsTableComponent from './RoomsTableComponent';
import { AdminServices } from 'services';

function RoomsTableContainer() {
    const [rooms, setRooms]=useState([]);
    const [name, setName]=useState([]);
    const [beginHour, setBeginHour]=useState([]);
    const [endHour, setEndHour]=useState([]);
    const [open, setOpen]=useState(false);
    const [dialog, setDialog]=useState(false);
    const [snackbarMessage, setSnackbarMessage]=useState([]);
    const [selectedId, setSelectedId]=useState();

    const handleClose = () => {
        setOpen(false);
      };

    const handleDialogClose = () => {
        setDialog(false);
    } 

    useEffect(() => {
        getAllRooms();
    }, [])

    async function getAllRooms(){
        const response = await AdminServices.getAllRooms();
        if(response.status===200){
            response.data.rooms.map(room=>{
                room.beginhour=room.begin_hour;
                room.endhour=room.end_hour;
                return null;
            })
            setRooms(response.data.rooms);
        } else {
            //error
        }
    }
   
    const onAdd = async ()=>{
        const response = await AdminServices.addEntityToTable({
            name,
            beginHour,
            endHour
        },"rooms");
        if(response.status===200){
            setSnackbarMessage("Room added!");
            setOpen(true);
            getAllRooms();
        }
        setDialog(false)
    }

    const onClickAction = (room) => {
        setName(room ? room.name : '');
        setBeginHour(room ? room.begin_hour : '');
        setEndHour(room ? room.end_hour : '');
        setDialog(true);
        setSelectedId(room ? room.id : -1);
    }


    const onEdit = async (id)=>{
        const response = await AdminServices.editEntityFromTable(selectedId, {
            name,
            beginHour,
            endHour
        },"rooms");
        if(response.status===200){
            setSnackbarMessage("Room edited!");
            setOpen(true);
            getAllRooms();
        }
        setDialog(false)
    }

    const onDelete = async(id)=>{
        const response = await AdminServices.deleteEntityFromTable(id,"rooms");
        if(response.status===200){
            setSnackbarMessage("Room deleted!");
            setOpen(true);
            getAllRooms();
        }
    }


    return (
        <RoomsTableComponent 
        rooms={rooms} 
        open={open}
        handleClose={handleClose} 
        onDelete={onDelete} 
        handleDialogClose={handleDialogClose}
        onEdit={onEdit}
        name={name}
        beginHour={beginHour}
        endHour={endHour}
        setName={setName}
        setBeginHour={setBeginHour}
        setEndHour={setEndHour} 
        snackbarMessage={snackbarMessage}
        setDialog={setDialog}
        dialog={dialog}
        onClickAction={onClickAction}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        onAdd={onAdd} />
    )
}

export default RoomsTableContainer;
