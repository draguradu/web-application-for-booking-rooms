import React, { useState } from 'react';
import FormComponent from './FormComponent';
import { FormExamsService } from 'services';
import { useFormExamContext } from 'contexts';
import { Redirect } from 'react-router-dom';

function FormContainer() {
    const {formExamState}=useFormExamContext();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async ()=>{
        const response= await FormExamsService.createExam({
            subject:formExamState.subjectForm.subject,
            professor:formExamState.subjectForm.professor,
            type:formExamState.subjectForm.type,
            room:formExamState.appointmentForm.room,
            dateOfExam:formExamState.appointmentForm.dateOfExam,
            duration:formExamState.appointmentForm.duration
        });        
         if(response.status===200 ){
             setIsSubmitted(true);
        } else {
            //error
        }
    }

    if(isSubmitted) {
        return <Redirect to="/exams"/>
    }

    return (
            <FormComponent 
                onSubmit={handleSubmit}
            />
    )
}

export default FormContainer;
