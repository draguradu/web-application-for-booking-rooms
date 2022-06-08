import axios from "axios"

async function login(data) {
    try {
        const response = await axios.post(`http://localhost:9000/auth/login`, {
            username:data.username,
            password:data.password
        });
        return response;
    } catch(error) {
        console.log(error);
        return "Error";
    }
}

function isLoggedUser() {
    if (localStorage.getItem('user')) {
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('user');
}

async function signup(data) {
    try{
        const response = await axios.post(`http://localhost:9000/auth/signup`, data);
        return response;
    } catch(error) {
        console.log(error);
        return "Error";
    }

}

export default{
    login,
    isLoggedUser,
    logout,
    signup
}