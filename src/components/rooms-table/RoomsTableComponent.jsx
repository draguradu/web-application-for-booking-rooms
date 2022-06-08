import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import { Snackbar, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, TextField, DialogActions, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { TableProjectContainer } from 'components';
import formStyles from "styles/formStyles.module.scss";

function DepartmentsTableComponent(props) {
  const {
    rooms,
    name,
    setName,
    beginHour,
    setBeginHour,
    endHour,
    setEndHour,
    selectedId,
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
    <TableCell key="Department" align="center">Room</TableCell>,
    <TableCell key="Begin hour" align="center">Begin hour</TableCell>,
    <TableCell key="End hour" align="center">End hour</TableCell>,
    <TableCell key="Actions" align="center">Actions</TableCell>,
  ];

  const propertyColums = [
    {
      value: 'name',
      align: 'center'
    },
    {
      value: 'beginhour',
      align: 'center'
    },
    {
      value: 'endhour',
      align: 'center'
    }
  ];

  return (
    <React.Fragment>

      <TableProjectContainer
        columns={columns}
        count={rooms.length}
        propertyColums={propertyColums}
        items={rooms}
        onClickAction={onClickAction}
        onDelete={onDelete} />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={dialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Room</DialogTitle>
        <DialogContent>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              variant="outlined" 
              id="name"
              label="Room"
              value={name}
              onChange={e=>setName(e.target.value)}
            />  
          </FormControl>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              variant="outlined" 
              id="beginHour"
              label="Begin hour"
              value={beginHour}
              onChange={e=>setBeginHour(e.target.value)}
            />  
          </FormControl>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              variant="outlined" 
              id="endHour"
              label="End hour"
              value={endHour}
              onChange={e=>setEndHour(e.target.value)}
            />  
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

DepartmentsTableComponent.propTypes={
  rooms:PropTypes.array,
  name:PropTypes.string,
  setName:PropTypes.func,
  beginHour:PropTypes.array,
  setBeginHour:PropTypes.func,
  endHour:PropTypes.array,
  setEndHour:PropTypes.func,
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

export default DepartmentsTableComponent;