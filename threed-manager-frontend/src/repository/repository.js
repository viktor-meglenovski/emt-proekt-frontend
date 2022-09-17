import axios from '../custom-axios/axios';

function placeAuthToken() {
    return {
        headers: {
            'Authorization': localStorage.getItem("JWT")
        }
    }
}

const Repository={

    register:(email, name, surname, password,repeatPassword, role)=>{
        return axios.post("http://localhost:8000/api/register",{
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
    },
    editProfile:(name,surname)=>{
        return axios.post("http://localhost:8000/api/editAccount",{
            name:name,
            surname:surname,
        }, placeAuthToken());
    },
    changeCompany:(company)=>{
        return axios.post("http://localhost:8001/api/client/changeCompany",{
            newCompany:company
        },placeAuthToken());
    },
    loadExternalLinkNames:()=>{
        return axios.get("http://localhost:8002/api/externalLinkNames", placeAuthToken());
    },
    addExternalLink:(externalLinkName, link)=>{
        return axios.post("http://localhost:8002/api/freelancer/addExternalLink",{
            externalLinkName:externalLinkName,
            link:link
        },placeAuthToken())
    },
    removeExternalLink:(externalLinkName)=>{
        return axios.post("http://localhost:8002/api/freelancer/removeExternalLink",{
            externalLinkName:externalLinkName
        },placeAuthToken())
    },
    loadClients:()=>{
        return axios.get("http://localhost:8001/api/client/findAll",placeAuthToken())
    },
    loadFreelancers:()=>{
        return axios.get("http://localhost:8002/api/freelancer/findAll",placeAuthToken())
    },
    loadUserByEmail:(email,role)=>{
        if(role==="FREELANCER"){
            return axios.get("http://localhost:8002/api/freelancer/findByEmail?email="+email,placeAuthToken());
        }else if(role==="CLIENT"){
            return axios.get("http://localhost:8001/api/client/findByEmail?email="+email, placeAuthToken());
        }
    },
    loadProjectsByStatus:(status)=>{
        return axios.get("http://localhost:8003/api/project/myProjectsByStatus?projectStatus="+status,placeAuthToken());
    },
    proposeProject:(name,description,dueDate,attachments,freelancerEmail)=>{
        const formData = new FormData();
        formData.append('name',name);
        formData.append('description',description);
        formData.append('dueDate',dueDate);
        formData.append('freelancerEmail',freelancerEmail);
        for(let i = 0; i< attachments.length; i++) {
            formData.append('attachments', attachments[i])
            console.log(attachments[i]);
        }
        return axios.post("http://localhost:8003/api/project/createProject",formData,placeAuthToken());
    },
    loadProject:(projectId)=>{
        return axios.get("http://localhost:8003/api/project/"+projectId,placeAuthToken());
    },
    downloadFile:(path)=>{
        return axios.get("http://localhost:8003/api/project/downloadFile?filePath="+path,placeAuthToken());
    }
}

export default Repository;