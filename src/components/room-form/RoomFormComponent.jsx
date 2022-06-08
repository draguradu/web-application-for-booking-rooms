import React from 'react';
import { InputLabel, Select, MenuItem, FormControl, Button, TextField, Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import formStyles from "styles/formStyles.module.scss"
import Alert from '@material-ui/lab/Alert';

function RoomFormComponent(props) {
    const {
        rooms,
        formExamState, 
        setFormExamState,
        handleBack, 
        disable,
        open,
        snackbarMessage,
        handleClose,
        onSubmit
    }=props;

    return (
        <React.Fragment>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity="warning">
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <FormControl variant="outlined" className={formStyles.item}>
              <InputLabel id="roomsForm-rooms">Rooms</InputLabel>
              <Select
                  labelId="roomsForm-rooms"
                  label="Room"
                  value={formExamState.appointmentForm.room ? formExamState.appointmentForm.room : ""}
                  onChange={e => {
                    setFormExamState({
                      ...formExamState,
                      appointmentForm: {
                        ...formExamState.appointmentForm,
                        room: e.target.value
                      }
                    });
                  }}
              >
                  {
                      rooms.map((room, index)=>(
                          <MenuItem key={index} value={room.id}>{room.name}</MenuItem>
                      ))
                  }
              
              </Select>
          </FormControl>
          
          <TextField 
              className={formStyles.item}
              label="Next appointment"
              type="datetime-local"
              defaultValue="2020-01-01T10:00"
              value={formExamState.appointmentForm.dateOfExam}
              onChange={e => {
                setFormExamState({
                  ...formExamState,
                  appointmentForm: {
                    ...formExamState.appointmentForm,
                    dateOfExam: e.target.value
                  }
                });
              }}
          />
          
          <TextField
              className={formStyles.item}
              label="Duration (in minutes)"
              type="number"
              variant="outlined"
              value={formExamState.appointmentForm.duration}
              onChange={e => {
                setFormExamState({
                  ...formExamState,
                  appointmentForm: {
                    ...formExamState.appointmentForm,
                    duration: e.target.value
                  }
                });
              }}
          />

          <div>
              <Button
                  onClick={handleBack}
              >
                  Back
              </Button>
              <Button
                  variant="contained"
                  color="primary"
                  disabled={disable}
                  onClick={onSubmit}
              >
                  Next
              </Button>  
          </div> 

        </React.Fragment>
        
    )
}

RoomFormComponent.propTyes={
    rooms:PropTypes.array,
    formExamState:PropTypes.object,
    setFormExamState:PropTypes.func,
    handleBack:PropTypes.func,
    disable:PropTypes.func,
    onSubmit: PropTypes.func,
    open: PropTypes.bool,
    snackbarMessage: PropTypes.string,
    handleClose: PropTypes.func
}

export default RoomFormComponent
