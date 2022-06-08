import React, { useState, useEffect } from 'react';
import AppointmentsTableComponent from './AppointmentsTableComponent';
import { AdminServices } from 'services';

function AppointmentsTableContainer() {
    const [appointments, setAppointments]=useState([]);
    const [startDateExam, setStartDateExam]=useState();
    const [duration, setDuration]=useState();
    const [rooms, setRooms]=useState([]);
    const [selectedRoom, setSelectedRoom]=useState();
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
        getAllAppointments();
    }, [])

    async function getAllAppointments(){
        const response = await AdminServices.getAllAppointments();
        if(response.status===200){
            response.data.appointments.map(appointment => {
                appointment.start = appointment.start_date_exam;
                appointment.roomName = appointment.room.name;
                return null;
            });
            setAppointments(response.data.appointments);
        } else {
            //error
        }
    }

    useEffect(() => {
        async function getAllRooms(){
            const response = await AdminServices.getAllRooms();
            if(response.status===200){
                setRooms(response.data.rooms);
            } else{
                //error
            }
        }
        getAllRooms();
    }, [])


    const onAdd = async ()=>{
        const response = await AdminServices.addEntityToTable({
            startDateExam,
            duration,
            room:selectedRoom
        },"appointments");
        if(response.status===200){
            setSnackbarMessage("Appointment added!");
            setOpen(true);
            getAllAppointments();
        }
        setDialog(false)
    }

    const onClickAction = (appointment) => {
        setStartDateExam(appointment ? appointment.start_date_exam : '');
        setDuration(appointment ? appointment.duration : '');
        setSelectedRoom(appointment ? appointment.room.id : '');
        setDialog(true);
        setSelectedId(appointment ? appointment.id : -1);
    }

    const onEdit = async ()=>{
        const response = await AdminServices.editEntityFromTable(selectedId, {
            startDateExam,
            duration,
            room:selectedRoom
        },"appointments");
        if(response.status===200){
            setSnackbarMessage("Appointment edited!");
            setOpen(true);
            getAllAppointments();
        }
        setDialog(false)
    }

    const onDelete = async(id)=>{
        const response = await AdminServices.deleteEntityFromTable(id,"appointments");
        if(response.status===200){
            setSnackbarMessage("Appointment deleted!");
            setOpen(true);
            getAllAppointments();
        }
    }

    return (
        <AppointmentsTableComponent 
        appointments={appointments}
        startDateExam={startDateExam}
        setStartDateExam={setStartDateExam}
        duration={duration}
        setDuration={setDuration}
        rooms={rooms}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
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

export default AppointmentsTableContainer;
