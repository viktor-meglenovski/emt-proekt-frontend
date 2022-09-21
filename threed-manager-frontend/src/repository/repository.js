import axios from '../custom-axios/axios';

function placeAuthToken() {
    return {
        headers: {
            'Authorization': localStorage.getItem("JWT")
        }
    }
}
const securityUrl="http://localhost:8000"
const clientUrl="http://localhost:8001"
const freelancerUrl="http://localhost:8002"
const projectUrl="http://localhost:8003"

const Repository={

    register:(email, name, surname, password,repeatPassword, role)=>{
        return axios.post(securityUrl+"/api/register",{
            "name":name,
            "surname":surname,
            "password":password,
            "repeatPassword":repeatPassword,
            "email":email,
            "role":role
        })
    },
    login:(email, password)=>{
        return axios.post(securityUrl+"/api/login",{
            "email":email,
            "password":password
        })
    },
    fetchUser:(role)=>{
        if(role==="FREELANCER"){
            return axios.get(freelancerUrl+"/api/freelancer/findByToken",placeAuthToken());
        }else if(role==="CLIENT"){
            return axios.get(clientUrl+"/api/client/findByToken", placeAuthToken());
        }
    },
    editProfile:(name,surname)=>{
        return axios.post(securityUrl+"/api/editAccount",{
            name:name,
            surname:surname,
        }, placeAuthToken());
    },
    changeCompany:(company)=>{
        return axios.post(clientUrl+"/api/client/changeCompany",{
            newCompany:company
        },placeAuthToken());
    },
    loadExternalLinkNames:()=>{
        return axios.get(freelancerUrl+"/api/externalLinkNames", placeAuthToken());
    },
    addExternalLink:(externalLinkName, link)=>{
        return axios.post(freelancerUrl+"/api/freelancer/addExternalLink",{
            externalLinkName:externalLinkName,
            link:link
        },placeAuthToken())
    },
    removeExternalLink:(externalLinkName)=>{
        return axios.post(freelancerUrl+"/api/freelancer/removeExternalLink",{
            externalLinkName:externalLinkName
        },placeAuthToken())
    },
    loadClients:()=>{
        return axios.get(clientUrl+"/api/client/findAll",placeAuthToken())
    },
    loadFreelancers:()=>{
        return axios.get(freelancerUrl+"/api/freelancer/findAll",placeAuthToken())
    },
    loadUserByEmail:(email,role)=>{
        if(role==="FREELANCER"){
            return axios.get(freelancerUrl+"/api/freelancer/findByEmail?email="+email,placeAuthToken());
        }else if(role==="CLIENT"){
            return axios.get(clientUrl+"/api/client/findByEmail?email="+email, placeAuthToken());
        }
    },
    loadProjectsByStatus:(status)=>{
        return axios.get(projectUrl+"/api/project/myProjectsByStatus?projectStatus="+status,placeAuthToken());
    },
    proposeProject:(name,description,dueDate,attachments,freelancerEmail)=>{
        const formData = new FormData();
        formData.append('name',name);
        formData.append('description',description);
        formData.append('dueDate',dueDate);
        formData.append('freelancerEmail',freelancerEmail);
        for(let i = 0; i< attachments.length; i++) {
            formData.append('attachments', attachments[i])
        }
        return axios.post(projectUrl+"/api/project/createProject",formData,placeAuthToken());
    },
    loadProject:(projectId)=>{
        return axios.get(projectUrl+"/api/project/"+projectId,placeAuthToken());
    },
    acceptProposal:(projectId)=>{
        return axios.post(projectUrl+"/api/project/acceptProposal",{
            projectId:projectId
        },placeAuthToken())
    },
    declineProposal:(projectId)=>{
        return axios.post(projectUrl+"/api/project/declineProposal",{
            projectId:projectId
        },placeAuthToken())
    },
    addTask:(projectId, taskTitle)=>{
        return axios.post(projectUrl+"/api/project/addTask",{
            projectId:projectId,
            taskTitle:taskTitle
        },placeAuthToken())
    },
    sendMessage:(projectId,taskId,content,messageAttachments)=>{
        const formData = new FormData();
        formData.append('projectId',projectId);
        formData.append('taskId',taskId);
        formData.append('content',content);
        for(let i = 0; i< messageAttachments.length; i++) {
            formData.append('messageAttachments', messageAttachments[i])
        }
        return axios.post(projectUrl+"/api/project/addMessageToTask",formData,placeAuthToken());
    },
    sendDelivery:(projectId,taskId,content,deliveryAttachments)=>{
        const formData = new FormData();
        formData.append('projectId',projectId);
        formData.append('taskId',taskId);
        formData.append('content',content);
        for(let i = 0; i< deliveryAttachments.length; i++) {
            formData.append('deliveryAttachments', deliveryAttachments[i])
            console.log("bla")
        }
        return axios.post(projectUrl+"/api/project/addDeliveryToTask",formData,placeAuthToken());
    },
    provideFeedbackForDelivery:(projectId,taskId,deliveryId, feedback,accepted)=>{
        return axios.post(projectUrl+"/api/project/provideFeedbackForDelivery",{
            projectId:projectId,
            taskId:taskId,
            deliveryId:deliveryId,
            feedback:feedback,
            accepted:accepted
        },placeAuthToken());
    },
    finishProject:(projectId)=>{
        return axios.post(projectUrl+"/api/project/finishProject",{
            projectId:projectId
        },placeAuthToken());
    }
}

export default Repository;