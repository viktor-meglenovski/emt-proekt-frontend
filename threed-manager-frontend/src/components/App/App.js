import './App.css';
import React, {Component} from "react";
import Repository from "../../repository/repository";
import {BrowserRouter as Router, Navigate , Route, Routes} from "react-router-dom";
import Register from '../Register/Register';
import Login from '../Login/Login'

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
        passwordsError:false,
        invalidError:false,
        emailTaken:"",
    }
  }
  register=(email, name, surname, password,repeatPassword, role)=>{
        Repository.register(email, name, surname, password,repeatPassword, role)
            .then((data)=>{

                this.setState({passwordsError:false})
                this.setState({invalidError:false})
                this.setState({emailTaken: ""})

                if(!data.data.hasOwnProperty("errorInformation")){
                    window.location.replace('/login')
                } else if(data.data.errorInformation==="Passwords"){
                    this.setState({passwordsError:true})
                }else if(data.data.errorInformation==="Invalid"){
                    this.setState({invalidError:true})
                } else {
                    this.setState({emailTaken: data.data})
                }
            })
  }
  login=(email,password)=>{
      Repository.login(email.password)
          .then((data)=>{console.log(data)});
  }

  componentDidMount(){
  }
  render() {
    return(
        <Router>
          <main>
            <div className="container">
                <Routes>
                    <Route path="/register" element={<Register onRegister={this.register}
                                                                passwordsError={this.state.passwordsError}
                                                                invalidError={this.state.invalidError}
                                                                emailTakenError={this.state.emailTaken}/>}/>
                    <Route path="/login" element={<Login onLogin={this.login}/>}/>
                </Routes>
            </div>
          </main>
        </Router>
    );
  }
}

export default App;