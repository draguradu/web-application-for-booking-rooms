import React, { useEffect, useState } from 'react'
import RoomFormComponent from './RoomFormComponent'
import { useFormExamContext } from 'contexts';
import { FormExamsService } from 'services';

function RoomFormContainer(props) {
    const [rooms,setRooms]=useState([]);
    const [disable, setDisable]=useState(true);
    const [snackbarMessage, setSnackbarMessage]=useState('');
    const {formExamState, setFormExamState}=useFormExamContext();
    const [open, setOpen]=useState(false);

    const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => {
       async function getRooms(){
           const response= await FormExamsService.getRooms();
           if(response.status===200){
               setRooms(response.data.rooms)
           } else {
               //error
           }
       }
       getRooms();
    }, [])

    useEffect(() => {
        const {room, dateOfExam, duration} = formExamState.appointmentForm;
        const checkValues = room && dateOfExam && duration;
        setDisable(!checkValues);
    }, [formExamState.appointmentForm]);

    const onSubmit = async () => {
        const response = await FormExamsService.checkAppointment({
            room: formExamState.appointmentForm.room,
            dateOfExam: formExamState.appointmentForm.dateOfExam,
            duration: formExamState.appointmentForm.duration,
        });
        if(response.status===200){
            props.handleNext();
        } else{
            //error
            setSnackbarMessage("Occupied room");
            setOpen(true);
        }
    }

    return (
        <RoomFormComponent
        {...props} 
        rooms={rooms}
        formExamState={formExamState} 
        setFormExamState={setFormExamState} 
        disable={disable}
        onSubmit={onSubmit}  
        open={open}
        snackbarMessage={snackbarMessage}
        handleClose={handleClose} />
    )
}

export default RoomFormContainer
