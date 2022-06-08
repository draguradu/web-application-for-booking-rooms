import axios from "axios";

async function getAllSubjects () {
    try{
        const response = await axios.get(`http://localhost:9000/subjects`);
    return response;
    }catch(error){
        return error;
    }
}

async function getAllAppointments () {
    const response = await axios.get(`http://localhost:9000/appointments`);
    return response;
}

async function getAllProfessors () {
    const response = await axios.get(`http://localhost:9000/professors`);
    return response;
}

async function getAllDepartments  () {
    const response = await axios.patch(`http://localhost:9000/departments`);
    return response;
}

async function getAllSpecializations  () {
    const response = await axios.get(`http://localhost:9000/specializations`);
    return response;
}

async function getAllUsers () {
    const response = await axios.get(`http://localhost:9000/users`);
    return response;
}

async function getAllRooms () {
    const response = await axios.get(`http://localhost:9000/rooms`);
    return response;
}

async function getRoles(){
    const response = await axios.get(`http://localhost:9000/users/roles`);
    return response;
}

async function addEntityToTable (data, table) {
    const response = await axios.post(`http://localhost:9000/${table}`, data);
    return response;
}

async function editEntityFromTable (id, data, table) {
    const response= await axios.put(`http://localhost:9000/${table}/${id}`,data);
    return response;
}

async function deleteEntityFromTable (id, table){
    const response = await axios.delete(`http://localhost:9000/${table}/${id}`)
    return response;
}

export default {
    getAllSubjects,
    getAllAppointments,
    getAllProfessors,
    getAllDepartments,
    getAllSpecializations,
    getAllUsers,
    getAllRooms,
    getRoles,
    addEntityToTable,
    editEntityFromTable,
    deleteEntityFromTable,
}