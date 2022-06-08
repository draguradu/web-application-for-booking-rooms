import React, { useState, useEffect } from 'react'
import SpecializationFormComponent from './SpecializationFormComponent'
import { FormExamsService } from 'services';
import { useFormExamContext } from 'contexts';

function SpecializationFormContainer(props) {
    const [specializations,setSpecializations]=useState([]);
    const [years,setYears]=useState(0);
    const [disable, setDisable]=useState(true);
    const {formExamState, setFormExamState}=useFormExamContext();

    useEffect(() => {
        async function getSpecializations(){
            const response=await FormExamsService.getSpecializations();
            if(response.status===200){
                setSpecializations(response.data.specializations);
            } else{
                //error
            }
        }
        getSpecializations();
    }, [])

    const getNumberOfYears =  async(id)=>{
        const response=await FormExamsService.getNumberOfYears(id);
            if(response.status===200){
                setYears(response.data.numberOfYears);
            } else{
                //error
            }
    }

    useEffect(() => {
        if(formExamState.specializationForm.specialization) {
            getNumberOfYears(formExamState.specializationForm.specialization)
        }
    }, [formExamState.specializationForm.specialization])

    useEffect(() => {
        const {specialization, yearOfStudy, semester} = formExamState.specializationForm;
        const checkValues = specialization && yearOfStudy && semester;
        setDisable(!checkValues);
        setFormExamState(formExamState => ({
            ...formExamState,
            subjectForm: {}
        }));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formExamState.specializationForm])
    
    return (
        <SpecializationFormComponent 
            {...props} 
            specializations={specializations} 
            formExamState={formExamState} 
            setFormExamState={setFormExamState} 
            years={years} 
            getNumberOfYears={getNumberOfYears} 
            disable={disable}
        />
        
    )
}

export default SpecializationFormContainer
