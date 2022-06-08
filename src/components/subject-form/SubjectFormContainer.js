import React, { useState, useEffect } from 'react'
import SubjectFormComponent from './SubjectFormComponent'
import { FormExamsService } from 'services';
import { useFormExamContext } from 'contexts';

function SubjectFormContainer(props) {
    const [subjects, setSubject]=useState([]);
    const [professors, setProfessors]=useState([]);
    const [types, setTypes]=useState([]);
    const [disable, setDisable]=useState(true);
    const {formExamState, setFormExamState}=useFormExamContext();

    //Subjects
    useEffect(() => {
        async function getSubjects(){
            const response=await FormExamsService.getSubjects({
               spec: formExamState.specializationForm.specialization,
               year: formExamState.specializationForm.yearOfStudy,
               sem: formExamState.specializationForm.semester
            });
            if(response.status===200){
                setSubject(response.data.subjects);
            } else{
                //error
            }
        }
        getSubjects();
        //eslint-disable-next-line react-hooks/exhaustive-deps   
    }, []);

    //Professors
    useEffect(() => {
        async function getProfessors(){
            const response= await FormExamsService.getProfessors({
                subj: formExamState.subjectForm.subject
            })
            if(response.status===200){
                setProfessors(response.data.professors);
            }
            else{
                //error
            }
        }
        if(formExamState.subjectForm.subject){
            getProfessors();   
        }
    }, [formExamState.subjectForm.subject]);

    //Types
    useEffect(() => {
        async function getTypes(){
            const response= await FormExamsService.getTypes();
            if(response.status===200){
                setTypes(response.data.types)
            }  else{
                //error
            }
        }
        getTypes();
    }, []);

    //Button disable OR enable
    useEffect(() => {
        const {subject, professor, type, prezentarea} = formExamState.subjectForm;
        const checkValues = subject && professor && type && prezentarea;
        setDisable(!checkValues);
    }, [formExamState.subjectForm]);

    return (
        <SubjectFormComponent
        {...props}  
        subjects={subjects}
        professors={professors} 
        types={types}
        formExamState={formExamState} 
        setFormExamState={setFormExamState} 
        disable={disable}
        />
    )
}

export default SubjectFormContainer
