import React from 'react';
import { InputLabel, Select, MenuItem, FormControl, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import formStyles from "styles/formStyles.module.scss"

function SpecializationFormComponent(props) {
  const {
    specializations, 
    formExamState, 
    setFormExamState, 
    years, 
    getNumberOfYears, 
    handleNext, 
    disable
  }=props;

  return (
    <React.Fragment>
      <FormControl variant="outlined" className={formStyles.item}> 
        <InputLabel id="demo-simple-select-outlined-label">Specialization</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Specialization"
          value={formExamState.specializationForm.specialization ? formExamState.specializationForm.specialization : ""}
          onChange={e => {
            setFormExamState({
              ...formExamState,
              specializationForm: {
                ...formExamState.specializationForm,
                specialization: e.target.value
              }
            });
            getNumberOfYears(e.target.value)
              }
          }>
          {
            specializations.map((specialization, index)=>(
              <MenuItem key={index} value={specialization.id}>{specialization.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={formStyles.item}>
        <InputLabel id="demo-simple-select-outlined-label">Year of study</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Year of study"
          value={formExamState.specializationForm.yearOfStudy ? formExamState.specializationForm.yearOfStudy : ""}
          onChange={e => {
            setFormExamState({
              ...formExamState,
              specializationForm: {
                ...formExamState.specializationForm,
                yearOfStudy: e.target.value
              }
            });
          }}
        >
          {[...Array(years).keys()].map((number) => (
            <MenuItem key={number} value={number+1}>
              {number+1}
            </MenuItem>
          ))}

        </Select>
      </FormControl>

      <FormControl variant="outlined" className={formStyles.item}>
        <InputLabel id="demo-simple-select-outlined-label">Semester</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Semester"
          value={formExamState.specializationForm.semester ? formExamState.specializationForm.semester : ""}
          onChange={e => {
            setFormExamState({
              ...formExamState,
              specializationForm: {
                ...formExamState.specializationForm,
                semester: e.target.value
              }
            });
          }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </Select>
      </FormControl>
      <div>
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

SpecializationFormComponent.propTypes={
  specializations:PropTypes.array,
  formExamState:PropTypes.object,
  setFormExamState:PropTypes.func,
  years:PropTypes.number,
  getNumberOfYears:PropTypes.func,
  handleNext:PropTypes.func,
  disable:PropTypes.bool,
}

export default SpecializationFormComponent
