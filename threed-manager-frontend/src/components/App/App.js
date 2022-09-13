import './App.css';
import React, {Component} from "react";
import Repository from "../../repository/repository";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Register from '../Register/Register';
import Login from '../Login/Login'
import MyProfile from "../MyProfile/MyProfile";
import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
import repository from "../../repository/repository";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordsError: false,
            invalidError: false,
            emailTaken: "",
            user:{}
        }
    }

    register = (email, name, surname, password, repeatPassword, role) => {
        Repository.register(email, name, surname, password, repeatPassword, role)
            .then((data) => {

                this.setState({passwordsError: false})
                this.setState({invalidError: false})
                this.setState({emailTaken: ""})

                if (!data.data.hasOwnProperty("errorInformation")) {
                    window.location.replace('/login')
                } else if (data.data.errorInformation === "Passwords") {
                    this.setState({passwordsError: true})
                } else if (data.data.errorInformation === "Invalid") {
                    this.setState({invalidError: true})
                } else {
                    this.setState({emailTaken: data.data})
                }
            })
    }
    fetchData = () => {
        this.loadUser();
    }
    loadUser=()=>{
        repository.fetchUser(localStorage.getItem("Role"))
            .then((data) => {
                this.setState({
                    user: data.data
                })
                console.log(data.data);
            });

    }
    componentDidMount() {
    }

    render() {
        return (
            <Router>
                <Header></Header>
                <main>
                    <div className="container">
                        <Routes>

                            <Route path="/login" element={<Login onLogin={this.fetchData}/>}/>
                            <Route path="/home" element={<HomePage/>}/>
                            {!localStorage.getItem("JWT") &&
                                <Route path="/register" element={<Register onRegister={this.register}
                                                                           passwordsError={this.state.passwordsError}
                                                                           invalidError={this.state.invalidError}
                                                                           emailTakenError={this.state.emailTaken}/>}/>}


                            //secured routes
                            {localStorage.getItem("JWT") && <Route path="/myProfile" element={<MyProfile/>}/>}

                            <Route path="/login" element={<Login onLogin={this.fetchData}/>}/>

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