import axios from "axios";

async function getUsers () {
    const response = await axios.get(`http://localhost:9000/users`);
    return response;
}

async function getRoles(){
    const response = await axios.get(`http://localhost:9000/users/roles`);
    return response;
}


export default {
    getUsers,
    getRoles
}