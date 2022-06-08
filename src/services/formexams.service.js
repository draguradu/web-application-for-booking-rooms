import axios from "axios";

async function getSpecializations () {
    const response = await axios.get(`http://localhost:9000/specializations`);
    return response;
}

async function getNumberOfYears (specializationId) {
    const response = await axios.get(`http://localhost:9000/specializations/number-of-years/${specializationId}`);
    return response;
}

async function  getSubjects(data){
    const response = await axios.patch(`http://localhost:9000/subjects/subjects-by-specialization`,data);
    return response;
}

async function getProfessors(data){
    const response = await axios.patch(`http://localhost:9000/professors/professors-by-subject`,data);
    return response;
}

async function getTypes(){
    const response = await axios.patch(`http://localhost:9000/subjects/types`);
    return response;
}

async function getRooms(){
    const response = await axios.get(`http://localhost:9000/rooms`);
    return response;
}

async function createExam(data){
    const response = await axios.post(`http://localhost:9000/exams`,data);
    return response;
}

async function getExamInfo(){
    const response = await axios.get(`http://localhost:9000/exams/examinfo`); 
    return response;
}

async function checkAppointment(data) {
    try {
        const response = await axios.patch(`http://localhost:9000/exams/checkAppointment`, data);
        return response;
    } catch(error) {
        return error;
    }
}

export default {
    getSpecializations,
    getNumberOfYears,
    getSubjects,
    getProfessors,
    getTypes,
    getRooms,
    createExam,
    getExamInfo,
    checkAppointment
}