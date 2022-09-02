import axios from '../custom-axios/axios';

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
        return axios.post("#",{
            "email":email,
            "password":password
        })
    }
}

export default Repository;