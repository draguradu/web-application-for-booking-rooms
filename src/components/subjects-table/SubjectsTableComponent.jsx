import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import { Snackbar, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, TextField, Select, MenuItem, DialogActions, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { TableProjectContainer } from 'components';
import formStyles from "styles/formStyles.module.scss";

function SubjectsTableComponent(props) {
  const {
    subjects,
    name,
    setName,
    semester,
    setSemester,
    studyYear,
    setStudyYear,
    specializations,
    selectedSpecialization,
    setSelectedSpecialization,
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
    <TableCell key="Subject" align="center">Subject</TableCell>,
    <TableCell key="Year" align="center">Year of study</TableCell>,
    <TableCell key="Semester" align="center">Semester</TableCell>,
    <TableCell key="Department" align="center">Department</TableCell>,
    <TableCell key="Specialization" align="center">Specialization</TableCell>,
    <TableCell key="Actions" align="center">Actions</TableCell>,
  ];

  const propertyColums = [
    {
      value: 'name',
      align: 'center'
    },
    {
      value: 'study_year',
      align: 'center'
    },
    {
      value: 'semester',
      align: 'center'
    },
    {
      value: 'departmentName',
      align: 'center'
    },
    {
      value: 'specializationName',
      align: 'center'
    }
  ];

  return (
    <React.Fragment>

      <TableProjectContainer
        columns={columns}
        count={subjects.length}
        propertyColums={propertyColums}
        items={subjects}
        onClickAction={onClickAction}
        onDelete={onDelete} />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={dialog} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Subject</DialogTitle>
        <DialogContent>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              variant="outlined" 
              id="name"
              label="Subject"
              value={name}
              onChange={e=>setName(e.target.value)}
            />  
          </FormControl>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              variant="outlined" 
              id="study_year"
              label="Study year"
              value={studyYear}
              onChange={e=>setStudyYear(e.target.value)}
              fullWidth
            />  
          </FormControl>

          <FormControl className={formStyles.item}> 
            <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
            <TextField
              id="semester"
              label="Semester"
              variant="outlined"
              value={semester}
              onChange={e=>setSemester(e.target.value)}
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
  subjects:PropTypes.array,
  name:PropTypes.string,
  setName:PropTypes.func,
  semester:PropTypes.number,
  setSemester:PropTypes.func,
  studyYear:PropTypes.number,
  setStudyYear:PropTypes.func,
  specializations:PropTypes.array,
  selectedSpecialization:PropTypes.number,
  setSelectedSpecialization:PropTypes.func,
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