import React, { useState, useEffect } from 'react';
import SubjectsTableComponent from './SubjectsTableComponent';
import { AdminServices } from 'services';

function SubjectsTableContainer() {
    const [subjects, setSubjects]=useState([]);
    const [name, setName]=useState();
    const [semester, setSemester]=useState();
    const [studyYear, setStudyYear]=useState();
    const [specializations,setSpecializations]=useState([]);
    const [selectedSpecialization, setSelectedSpecialization]=useState();
    const [departments, setDepartments]=useState([]);
    const [selectedDepartment, setSelectedDepartment]=useState();
    const [open, setOpen]=useState(false);
    const [snackbarMessage, setSnackbarMessage]=useState('');
    const [dialog, setDialog]=useState(false);
    const [selectedId, setSelectedId]=useState();

    const handleClose = () => {
        setOpen(false);
      };

      const handleDialogClose = () => {
          setDialog(false);
      } 

    useEffect(() => {
        getAllSubjects();
    }, [])

    async function getAllSubjects(){
        const response = await AdminServices.getAllSubjects();
        if(response.status===200){
            response.data.subjects.map(subject => {
                subject.departmentName = subject.department.name;
                subject.specializationName = subject.specialization.name;
                return null;
            });
            setSubjects(response.data.subjects);
        } else {
            //error
        }
    }

    useEffect(() => {
        async function getAllSpecializations(){
            const response = await AdminServices.getAllSpecializations();
            if(response.status===200){
                setSpecializations(response.data.specializations);
            } else{
                //error
            }
        }
        getAllSpecializations();
    }, [])

    useEffect(() => {
        async function getAllDepartments(){
            const response = await AdminServices.getAllDepartments();
            if(response.status===200){
                setDepartments(response.data.departments);
            } else{
                //error
            }
        }
        getAllDepartments();
    }, [])

    const onAdd = async ()=>{
        const response = await AdminServices.addEntityToTable({
            name,
            semester,
            studyYear,
            department:selectedDepartment,
            specialization:selectedSpecialization,
        },"subjects");
        if(response.status===200){
            setSnackbarMessage("Subject added!");
            setOpen(true);
            getAllSubjects();
        }
        setDialog(false)
    }

    const onClickAction = (subject) => {
        setName(subject ? subject.name : '');
        setStudyYear(subject ? subject.study_year : '');
        setSemester(subject ? subject.semester : '');
        setSelectedDepartment(subject ? subject.department.id : '');
        setSelectedSpecialization(subject ? subject.specialization.id : '');
        setDialog(true);
        setSelectedId(subject ? subject.id : -1);
    }

    const onEdit = async ()=>{
        const response = await AdminServices.editEntityFromTable(selectedId, {
            name,
            semester,
            studyYear,
            department:selectedDepartment,
            specialization:selectedSpecialization,
        },"subjects");
        if(response.status===200){
            setSnackbarMessage("Subject edited!");
            setOpen(true);
            getAllSubjects();
        }
        setDialog(false)
    }

    const onDelete = async(id)=>{
        const response = await AdminServices.deleteEntityFromTable(id,"subjects");
        if(response.status===200){
            setSnackbarMessage("Subject deleted!");
            setOpen(true);
            getAllSubjects();
        }
    }

    return (
        <SubjectsTableComponent 
        subjects={subjects}
        name={name}
        setName={setName}
        semester={semester}
        setSemester={setSemester}
        studyYear={studyYear}
        setStudyYear={setStudyYear}
        specializations={specializations}
        selectedSpecialization={selectedSpecialization}
        setSelectedSpecialization={setSelectedSpecialization}
        departments={departments}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedId={selectedId}
        onAdd={onAdd}
        onClickAction={onClickAction}
        onEdit={onEdit}
        onDelete={onDelete}
        open={open}
        dialog={dialog}
        handleDialogClose={handleDialogClose}
        snackbarMessage={snackbarMessage}
        handleClose={handleClose} />
    )
}

export default SubjectsTableContainer;
