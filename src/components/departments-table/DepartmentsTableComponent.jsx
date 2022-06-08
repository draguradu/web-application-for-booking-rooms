import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import { Snackbar, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, TextField, DialogActions, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { TableProjectContainer } from 'components';
import formStyles from "styles/formStyles.module.scss";

function DepartmentsTableComponent(props) {
  const {
    departments,
    name,
    setName,
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
    <TableCell key="Department" align="center">Department</TableCell>,
    <TableCell key="Actions" align="center">Actions</TableCell>,
  ];

  const propertyColums = [
    {
      value: 'name',
      align: 'center'
    }
  ];

  return (
    <React.Fragment>

      <TableProjectContainer
        columns={columns}
        count={departments.length}
        propertyColums={propertyColums}
        items={departments}
        onClickAction={onClickAction}
        onDelete={onDelete} />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={dialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Department</DialogTitle>
        <DialogContent>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              variant="outlined" 
              id="name"
              label="Department"
              value={name}
              onChange={e=>setName(e.target.value)}
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
  departments:PropTypes.array,
  name:PropTypes.string,
  setName:PropTypes.func,
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