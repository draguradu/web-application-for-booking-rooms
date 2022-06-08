import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import { Snackbar, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, TextField, Select, MenuItem, DialogActions, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { TableProjectContainer } from 'components';
import formStyles from "styles/formStyles.module.scss";

function SubjectsTableComponent(props) {
  const {
    professors,
    name,
    setName,
    departments,
    selectedDepartment,
    setSelectedDepartment,
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
    <TableCell key="Professor" align="center">Professor</TableCell>,
    <TableCell key="Department" align="center">Department</TableCell>,
    <TableCell key="Actions" align="center">Actions</TableCell>,
  ];

  const propertyColums = [
    {
      value: 'name',
      align: 'center'
    },
    {
      value: 'departmentName',
      align: 'center'
    }
  ];

  return (
    <React.Fragment>

      <TableProjectContainer
        columns={columns}
        count={professors.length}
        propertyColums={propertyColums}
        items={professors}
        onClickAction={onClickAction}
        onDelete={onDelete} />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={dialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Professor</DialogTitle>
        <DialogContent>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              variant="outlined" 
              id="name"
              label="Professor"
              value={name}
              onChange={e=>setName(e.target.value)}
            />  
          </FormControl>

          <FormControl variant="outlined" className={formStyles.item} > 
              <InputLabel id="signup-specialization">Department</InputLabel>
              <Select
                  labelId="signup-specialization"
                  label="Department"
                  value={selectedDepartment}
                  onChange={e=>setSelectedDepartment(e.target.value)}
              >
              {
                  departments.map((department, index)=>(
                      <MenuItem key={index} value={department.id}>{department.name}</MenuItem>
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
  professors:PropTypes.array,
  name:PropTypes.string,
  setName:PropTypes.func,
  departments:PropTypes.array,
  selectedDepartment:PropTypes.number,
  setSelectedDepartment:PropTypes.func,
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