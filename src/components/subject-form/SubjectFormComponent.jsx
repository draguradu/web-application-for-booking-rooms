import React from 'react';
import { InputLabel, Select, MenuItem, FormControl, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import formStyles from "styles/formStyles.module.scss"

function SubjectFormComponent(props) {
  const 
  {
    subjects, 
    professors,
    types,
    formExamState, 
    setFormExamState,
    handleBack, 
    handleNext, 
    disable
  }=props;
  
  return (
    <React.Fragment>
      <FormControl variant="outlined" className={formStyles.item}>
        <InputLabel id="demo-simple-select-outlined-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Subject"
          value={formExamState.subjectForm.subject ? formExamState.subjectForm.subject : ""}
          onChange={e => {
            setFormExamState({
              ...formExamState,
              subjectForm: {
                ...formExamState.subjectForm,
                subject: e.target.value
              }
            });
          }}
        >
          {
            subjects.map((subject, index)=>(
              <MenuItem key={index} value={subject.id}>{subject.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={formStyles.item}>
        <InputLabel id="demo-simple-select-outlined-label">Professor</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Professor"
          value={formExamState.subjectForm.professor ? formExamState.subjectForm.professor : ""}
          onChange={e => {
            setFormExamState({
              ...formExamState,
              subjectForm: {
                ...formExamState.subjectForm,
                professor: e.target.value
              }
            });
          }}
        >
          {
            professors.map((professor, index)=>(
              <MenuItem key={index} value={professor.id} >{professor.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    
      <FormControl variant="outlined" className={formStyles.item}>
        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Type"
          value={formExamState.subjectForm.type ? formExamState.subjectForm.type : ""}
          onChange={e => {
            setFormExamState({
              ...formExamState,
              subjectForm: {
                ...formExamState.subjectForm,
                type: e.target.value
              }
            });
          }}
        >
          {
            types.map((type, index)=>(
              <MenuItem key={index} value={type.id}>{type.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={formStyles.item}>
        <InputLabel id="demo-simple-select-outlined-label">Prezentation</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Semester"
          value={formExamState.subjectForm.prezentarea ? formExamState.subjectForm.prezentarea : ""}
          onChange={e => {
            setFormExamState({
              ...formExamState,
              subjectForm: {
                ...formExamState.subjectForm,
                prezentarea: e.target.value
              }
            });
          }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>

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
        onClick={handleNext}
      >
        Next
      </Button>  
        </div> 
  
    </React.Fragment>
  )
}

SubjectFormComponent.propTypes={
  subjects:PropTypes.array,
  professors:PropTypes.array,
  types:PropTypes.array,
  formExamState:PropTypes.object,
  setFormExamState:PropTypes.func,
  handleBack:PropTypes.func,
  handleNext:PropTypes.func,
  disable:PropTypes.bool,

}

export default SubjectFormComponent
