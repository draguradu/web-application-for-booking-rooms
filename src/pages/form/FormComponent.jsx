import 'date-fns';
import React from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { SpecializationFormContainer, SubjectFormContainer, RoomFormContainer } from 'components';
import { useFormExamContext } from 'contexts';
import PropTypes from 'prop-types'; 
import styles from "./Form.module.scss";

function FormComponent(props) {
    const {
      onSubmit
    }=props;
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const {formExamState, setFormExamState}=useFormExamContext();
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setFormExamState({...formExamState,
        specializationForm: {},
        subjectForm: {},
        appointmentForm: {}
    })      
    };

    function getSteps() {
      return ['Specialization', 'Subject','Date and time',];
    }
    
    function getStepContent(step) {
      switch (step) {
        case 0:
          return(
            <SpecializationFormContainer handleBack={handleBack} handleNext={handleNext}/>
          );
        case 1:
          return (
            <SubjectFormContainer handleBack={handleBack} handleNext={handleNext}/>
          );
        case 2:
          return (
            <RoomFormContainer handleBack={handleBack} handleNext={handleNext}/>
          );
        default:
          return 'Unknown step';
      }
    }
  
    return (
      <div className={styles.stepper}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <div className={styles.buttons}>
              <Button 
                variant="contained"
                color="primary"
                onClick={()=>onSubmit()}>Make appointment</Button>
              <Button onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Paper>
        )}
      </div>
    )
}

FormComponent.propTypes={
  onSubmit:PropTypes.func
}
export default FormComponent;