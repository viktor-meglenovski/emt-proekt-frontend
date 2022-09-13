import axios from '../custom-axios/axios';

function placeAuthToken() {
    return {
        headers: {
            'Authorization': localStorage.getItem("JWT")
        }
    }
    // return {
    //     'Authorization':localStorage.getItem("JWT")
    // }
}

const Repository={

    register:(email, name, surname, password,repeatPassword, role)=>{
        return axios.post("http://localhost:8001/api/register",{
            "name":name,
            "surname":surname,
            "password":password,
            "repeatPassword":repeatPassword,
            "email":email,
            "role":role
        })
    },
    login:(email, password)=>{
        return axios.post("http://localhost:8000/api/login",{
            "email":email,
            "password":password
        })
    },
    fetchUser:(role)=>{
        if(role==="FREELANCER"){
            return axios.get("http://localhost:8002/api/freelancer/findByToken",placeAuthToken());
        }else if(role==="CLIENT"){
            return axios.get("http://localhost:8001/api/client/findByToken", placeAuthToken());
        }
    }
}

export default Repository;