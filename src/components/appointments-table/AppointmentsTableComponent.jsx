import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import { Snackbar, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, TextField, DialogActions, Button, Select, MenuItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { TableProjectContainer } from 'components';
import formStyles from "styles/formStyles.module.scss";

function SubjectsTableComponent(props) {
  const {
    appointments,
    startDateExam,
    setStartDateExam,
    duration,
    setDuration,
    selectedRoom,
    setSelectedRoom,
    selectedId,
    rooms,
    onAdd,
    onClickAction,
    onEdit,
    onDelete,
    open,
    snackbarMessage,
    handleClose,
    handleDialogClose,
    dialog,
  }=props;

  const columns = [
    <TableCell key="Start date" align="center">Start date</TableCell>,
    <TableCell key="Year" align="center">Duration</TableCell>,
    <TableCell key="Semester" align="center">Room</TableCell>,
    <TableCell key="Actions" align="center">Actions</TableCell>,
  ];

  const propertyColums = [
    {
      value: 'start',
      align: 'center'
    },
    {
      value: 'duration',
      align: 'center'
    },
    {
      value: 'roomName',
      align: 'center'
    },
  ];

  return (
    <React.Fragment>

      <TableProjectContainer
        columns={columns}
        count={appointments.length}
        propertyColums={propertyColums}
        items={appointments}
        onClickAction={onClickAction}
        onDelete={onDelete} />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={dialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Appointment</DialogTitle>
        <DialogContent>

            <FormControl className={formStyles.item}> 
                <TextField
                className={formStyles.item}
                type="datetime-local"
                defaultValue="2020-01-01T10:00"
                value={startDateExam}
                onChange={e=>setStartDateExam(e.target.value)}
                />  
            </FormControl>

            <FormControl className={formStyles.item}> 
                <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                <TextField
                variant="outlined" 
                id="duration"
                label="Duration"
                value={duration}
                onChange={e=>setDuration(e.target.value)}
                fullWidth
                />  
            </FormControl>

            <FormControl variant="outlined" className={formStyles.item}> 
              <InputLabel id="signup-room">Room</InputLabel>
              <Select
                variant="outlined"
                labelId="signup-room"
                label="Room"
                value={selectedRoom}
                onChange={e=>setSelectedRoom(e.target.value)}
              >
              {
                  rooms.map((room, index)=>(
                      <MenuItem key={index} value={room.id}>{room.name}</MenuItem>
                  ))
              }
              </Select>
            </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{
            if(selectedId===-1){
              onAdd()
            }else {
              onEdit()
            }
            }}
            color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
  );
}

SubjectsTableComponent.propTypes={
  appointments:PropTypes.array,
  startDateExam:PropTypes.array,
  setStartDateExam:PropTypes.func,
  duration:PropTypes.number,
  setDuration:PropTypes.func,
  rooms:PropTypes.array,
  selectedRoom:PropTypes.array,
  setSelectedRoom:PropTypes.func,
  selectedId:PropTypes.number,
  onAdd:PropTypes.func,
  onClickAction:PropTypes.func,
  onEdit:PropTypes.func,
  onDelete:PropTypes.func,
  open:PropTypes.bool,
  dialog:PropTypes.bool,
  snackbarMessage:PropTypes.string,
  handleClose:PropTypes.func,
  handleDialogClose:PropTypes.func
}

export default SubjectsTableComponent;