import React, {Component} from 'react';
import repository from "../../repository/repository";
import {useNavigate} from 'react-router-dom'

class Login extends Component {
    state = {
        emptyInputsError: false,
        invalidCredentialsError: false
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        repository.login(email, password).then(resp => {
            this.setState({emptyInputsError: false})
            this.setState({invalidCredentialsError: false})

            if (!resp.data.hasOwnProperty("errorInformation")){
                localStorage.setItem("JWT", "Bearer " + resp.data.token);
                var tokenParse = this.parseJwt(resp.data.token);
                localStorage.setItem("Email", tokenParse.email);
                localStorage.setItem("Role", tokenParse.role);
                this.props.onLogin();
                const navigate = this.props.navigation;
                navigate("/myProfile")
            }else if (resp.data.errorInformation === "Invalid") {
                this.setState({emptyInputsError: true})
            } else if (resp.data.errorInformation === "Credentials") {
                this.setState({invalidCredentialsError: true})
            }
        })
    }

    parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    render() {
        return (
            <div className={"container col-6 text-dark border border-dark rounded-5 mt-4"}>
                <h1 className={"text-center"}>Login</h1>
                <hr/>
                <div className="text-danger mb-2">
                    {this.state.emptyInputsError &&
                        <div className="bg-danger text-white rounded-5 ps-2 pe-2 pt-1 pb-1 text-center"><h4>Email and Password cannot be empty!</h4></div>}
                    {this.state.invalidCredentialsError &&
                        <div className="bg-danger text-white rounded-5 ps-2 pe-2 pt-1 pb-1 text-center"><h4>Invalid user credentials combination!</h4></div>}
                </div>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group mb-3">
                        <input className="form-control" type="email" name="email" id="email" placeholder="E-mail"/>
                    </div>
                    <div className="form-group mb-3">
                        <input className="form-control" type="password" name="password" id="password"
                               placeholder="Password"/>
                    </div>
                    <hr/>
                    <button className="btn btn-block btn-lg btn-success col-12 rounded-5 mb-2 "
                            type="submit">Log In
                    </button>
                    <a className="btn btn-block btn-lg btn-primary col-12 rounded-5 mb-2" href="/register">Do not have an account? Register here!</a>
                </form>
            </div>
        );
    }
}
export default function(props) {
    const navigation = useNavigate();

    return <Login {...props} navigation={navigation} />;
}