import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import { Snackbar, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, TextField, Select, MenuItem, DialogActions, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { TableProjectContainer } from 'components';
import formStyles from "styles/formStyles.module.scss";

function SubjectsTableComponent(props) {
  const {
    users,
    name,
    setName,
    username,
    setUsername,
    password,
    setPassword,
    yearsOfStudy,
    setYearsOfStudy,
    specializations,
    selectedSpecialization,
    setSelectedSpecialization,
    roles,
    selectedRole,
    setSelectedRole,
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
    <TableCell key="Name" align="center">Name</TableCell>,
    <TableCell key="Username" align="center">Username</TableCell>,
    <TableCell key="Password" align="center">Password</TableCell>,
    <TableCell key="Year" align="center">Year of study</TableCell>,
    <TableCell key="Specialization" align="center">Specialization</TableCell>,
    <TableCell key="Role" align="center">Role</TableCell>,
    <TableCell key="Actions" align="center">Actions</TableCell>,
  ];

  const propertyColums = [
    {
      value: 'name',
      align: 'center'
    },
    {
      value: 'username',
      align: 'center'
    },
    {
      value: 'password',
      align: 'center'
    },
    {
      value: 'year',
      align: 'center'
    },
    {
      value: 'specializationName',
      align: 'center'
    },
    {
      value: 'roleName',
      align: 'center'
    },
  ];

  return (
    <React.Fragment>

      <TableProjectContainer
        columns={columns}
        count={users.length}
        propertyColums={propertyColums}
        items={users}
        onClickAction={onClickAction}
        onDelete={onDelete} />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={dialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New User</DialogTitle>
        <DialogContent>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              variant="outlined" 
              id="name"
              label="Name"
              value={name}
              onChange={e=>setName(e.target.value)}
            />  
          </FormControl>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              variant="outlined" 
              id="username"
              label="Username"
              value={username}
              onChange={e=>setUsername(e.target.value)}
            />  
          </FormControl>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              variant="outlined" 
              id="password"
              label="Password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />  
          </FormControl>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              variant="outlined" 
              id="yearsOfStudy"
              label="Study year"
              value={yearsOfStudy}
              onChange={e=>setYearsOfStudy(e.target.value)}
              fullWidth
            />  
          </FormControl>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              fullWidth
            />  
          </FormControl>

          <FormControl variant="outlined" className={formStyles.item}> 
              <InputLabel id="signup-specialization">Specialization</InputLabel>
              <Select
                  labelId="signup-specialization"
                  label="Specialization"
                  value={selectedSpecialization}
                  onChange={e=>setSelectedSpecialization(e.target.value)}
              >
              {
                  specializations.map((specialization, index)=>(
                      <MenuItem key={index} value={specialization.id}>{specialization.name}</MenuItem>
                  ))
              }
              </Select>
          </FormControl>

          <FormControl variant="outlined" className={formStyles.item} > 
              <InputLabel id="signup-specialization">Role</InputLabel>
              <Select
                  labelId="signup-specialization"
                  label="Role"
                  value={selectedRole}
                  onChange={e=>setSelectedRole(e.target.value)}
              >
              {
                  roles.map((role, index)=>(
                      <MenuItem key={index} value={role.id}>{role.name}</MenuItem>
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
  users:PropTypes.array,
  name:PropTypes.string,
  setName:PropTypes.func,
  username:PropTypes.string,
  setUserame:PropTypes.func,
  password:PropTypes.array,
  setPassword:PropTypes.func,
  yearsOfStudy:PropTypes.number,
  setYearsOfStudy:PropTypes.func,
  specializations:PropTypes.array,
  selectedSpecialization:PropTypes.number,
  setSelectedSpecialization:PropTypes.func,
  roles:PropTypes.array,
  selectedRole:PropTypes.number,
  setSelectedRole:PropTypes.func,
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