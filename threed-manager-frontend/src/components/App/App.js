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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            externalLinkNames:[]
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
    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <Router>
                <Header></Header>
                <main>
                    <div className="container">
                        <Routes>
                            <Route path="/home" element={<HomePage/>}/>
                            {!localStorage.getItem("JWT") && <Route path="/register" element={<Register/>}/>}
                            {!localStorage.getItem("JWT") && <Route path="/login" element={<Login onLogin={this.loadUser}/>}/>}


                            //secured routes
                            {localStorage.getItem("JWT") && <Route path="/myProfile"  element={<MyProfile externalLinkNames={this.state.externalLinkNames} user={JSON.parse(localStorage.getItem("User"))}/>}/>}
                            {localStorage.getItem("JWT") && <Route path="/editProfile" element={<EditProfile externalLinkNames={this.state.externalLinkNames} reloadUser={this.loadUser} user={JSON.parse(localStorage.getItem("User"))}/>}/>}
                            {localStorage.getItem("JWT") && localStorage.getItem("Role")==="CLIENT" && <Route path="/changeCompany" element={<ChangeCompany reloadUser={this.loadUser} user={JSON.parse(localStorage.getItem("User"))}/>}/>}
                            {localStorage.getItem("JWT") && localStorage.getItem("Role")==="FREELANCER" && <Route path="/linkAccounts" element={<LinkAccounts externalLinkNames={this.state.externalLinkNames} reloadUser={this.loadUser} user={JSON.parse(localStorage.getItem("User"))}/>}/>}


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