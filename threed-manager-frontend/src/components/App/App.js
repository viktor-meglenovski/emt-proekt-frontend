import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useHistory} from "react-router-dom";
import Register from '../Register/Register';
import Login from '../Login/Login'
import MyProfile from "../MyProfile/MyProfile";
import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
import repository from "../../repository/repository";
import EditProfile from "../MyProfile/EditProfile/EditProfile";
import ChangeCompany from "../MyProfile/ChangeCompany/ChangeCompany";
import LinkAccounts from "../MyProfile/LinkAccounts/LinkAccounts";
import Clients from "../Clients/Clients";
import VisitProfile from "../MyProfile/VisitProfile/VisitProfile";
import Freelancers from "../Freelancers/Freelancers";
import MyProjects from "../Projects/MyProjects/MyProjects";
import ProposeProject from "../Projects/ProposeProject/ProposeProject";
import ViewProject from "../Projects/ViewProject/ViewProject"
import ViewTask from "../Projects/ViewProject/Tasks/ViewTask/ViewTask";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            externalLinkNames: [],
            clients: [],
            profileToView: null,
            project:null,
            task:null
        }
    }
    fetchData = () => {
        this.loadExternalLinkNames();
    }
    loadExternalLinkNames=()=>{
        repository.loadExternalLinkNames().then((data)=>{
            this.setState({
                externalLinkNames:data.data
            })
        })
    }
    loadUser=()=>{
        repository.fetchUser(localStorage.getItem("Role"))
            .then((data) => {
                this.setState({
                    user: data.data
                })
                localStorage.setItem("User",JSON.stringify(data.data));
            });
    }
    loadProject=(projectId)=>{
        console.log(this.state.project)
        console.log(projectId)
        repository.loadProject(projectId).then((resp)=>{
            this.setState({project:resp.data})
        })
        console.log(this.state.project)
    }
    componentDidMount() {
        this.fetchData();
    }
    getProfile=(email,role)=>{
        repository.loadUserByEmail(email,role).then((resp)=>{
            this.setState({
                profileToView: resp.data
            })
        })
    }
    loadTask=(projectId,taskId)=>{
        this.loadProject(projectId);
        this.setState({
            task:this.state.project.projectTasks.filter(x=>x.id.id===taskId)[0]
        })
    }
    updateTask=(task)=>{
        this.setState({
            task:task
        })
    }

    render() {
        return (
            <Router>
                <Header></Header>
                <main>
                    <div className="container-fluid">
                        <Routes>
                            <Route path="/home" element={<HomePage/>}/>
                            {!localStorage.getItem("JWT") && <Route path="/register" element={<Register/>}/>}
                            {!localStorage.getItem("JWT") && <Route path="/login" element={<Login onLogin={this.loadUser}/>}/>}


                            //secured routes
                            {localStorage.getItem("JWT") && <Route path="/myProfile"  element={<MyProfile externalLinkNames={this.state.externalLinkNames} user={JSON.parse(localStorage.getItem("User"))}/>}/>}
                            {localStorage.getItem("JWT") && <Route path="/editProfile" element={<EditProfile externalLinkNames={this.state.externalLinkNames} reloadUser={this.loadUser} user={JSON.parse(localStorage.getItem("User"))}/>}/>}
                            {localStorage.getItem("JWT") && localStorage.getItem("Role")==="CLIENT" && <Route path="/changeCompany" element={<ChangeCompany reloadUser={this.loadUser} user={JSON.parse(localStorage.getItem("User"))}/>}/>}
                            {localStorage.getItem("JWT") && localStorage.getItem("Role")==="FREELANCER" && <Route path="/linkAccounts" element={<LinkAccounts externalLinkNames={this.state.externalLinkNames} reloadUser={this.loadUser} user={JSON.parse(localStorage.getItem("User"))}/>}/>}
                            {localStorage.getItem("JWT") && localStorage.getItem("Role")==="FREELANCER" && <Route path="/clients"  element={<Clients onView={this.getProfile}/>}/>}
                            {localStorage.getItem("JWT") && localStorage.getItem("Role")==="CLIENT" && <Route path="/freelancers"  element={<Freelancers onView={this.getProfile} onPropose={this.getProfile}/>}/>}
                            {localStorage.getItem("JWT") && <Route path="/visitProfile/:email/:role" element={<VisitProfile user={this.state.profileToView}/>}/>}
                            {localStorage.getItem("JWT") && <Route path="/myProjects" element={<MyProjects onProjectView={this.loadProject} status={"PROPOSED"} onProfileView={this.getProfile}/>}/>}
                            {localStorage.getItem("JWT") && <Route path="/proposeProject/:email" element={<ProposeProject user={this.state.profileToView}/>}/>}
                            {localStorage.getItem("JWT") && <Route path="/viewProject/:projectId" element={<ViewProject project={this.state.project} reloadProject={this.loadProject} viewTask={this.loadTask}/>}/>}
                            {localStorage.getItem("JWT") && <Route path="/viewTask/:projectId/:taskId" element={<ViewTask project={this.state.project} task={this.state.task} reloadTask={this.loadTask} onProjectView={this.loadProject} updateTask={this.updateTask}/>}/>}

                            //default route
                            <Route path="*" element={<Navigate to="/home" />}/>
                        </Routes>
                    </div>
                </main>
            </Router>
        );
    }
}

export default App;