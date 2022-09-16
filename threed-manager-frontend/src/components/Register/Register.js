import React, {Component} from 'react';
import Repository from "../../repository/repository";

class Register extends Component {
    state = {
        passwordsError: false,
        invalidError: false,
        emailTakenError: ""
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        var form = e.target
        const email = form.elements.email.value;
        const name = form.elements.name.value;
        const surname = form.elements.surname.value;
        const password = form.elements.password.value;
        const repeatPassword = form.elements.repeatPassword.value;
        const role = form.elements.role.value;
        this.register(email, name, surname, password, repeatPassword, role);
    }
    register = (email, name, surname, password, repeatPassword, role) => {
        Repository.register(email, name, surname, password, repeatPassword, role)
            .then((data) => {

                this.setState({passwordsError: false})
                this.setState({invalidError: false})
                this.setState({emailTakenError: ""})

                if (!data.data.hasOwnProperty("errorInformation")) {
                    window.location.replace('/login')
                } else if (data.data.errorInformation === "Passwords") {
                    this.setState({passwordsError: true})
                } else if (data.data.errorInformation === "Invalid") {
                    this.setState({invalidError: true})
                } else {
                    this.setState({emailTakenError: data.data})
                }
            })
    }

    render() {
        return (
            <div className={"container col-6 text-dark border border-dark rounded-5 mt-4"}>
                <h1 className={"text-center mt-2"}>Register a new User</h1>
                <hr/>
                <div className="text-danger mb-2">
                    {this.state.passwordsError &&
                        <div className="bg-danger text-white rounded-5 ps-2 pe-2 text-center"><h4>Passwords do not
                            match!</h4></div>}
                    {this.state.invalidError &&
                        <div className="bg-danger text-white rounded-5 ps-2 pe-2 pt-1 pb-1 text-center"><h4>Email and
                            Password cannot be empty!</h4></div>}
                    {this.state.emailTakenError !== "" ?
                        <div className="bg-danger text-white rounded-5 ps-2 pe-2 text-center"><h5>The
                            email {this.state.emailTakenError.errorInformation} is already in use!</h5></div> : ""}
                </div>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group mb-3">
                        <input className="form-control" type="email" name="email" id="email" placeholder="E-mail"/>
                    </div>
                    <div className="form-group mb-3">
                        <input className="form-control" type="password" name="password" id="password"
                               placeholder="Password"/>
                    </div>
                    <div className="form-group mb-3">
                        <input className="form-control" type="password" name="repeatPassword" id="repeatPassword"
                               placeholder="Repeat Password"/>
                    </div>
                    <div className="form-group mb-3">
                        <input className="form-control" type="text" name="name" id="name" placeholder="Name"/>
                    </div>
                    <div className="form-group mb-3">
                        <input className="form-control" type="text" name="surname" id="surname" placeholder="Surname"/>
                    </div>
                    <p className="d-inline me-4 ms-2">Register as a:</p>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="role" id="client" value="CLIENT"/>
                        <label className="form-check-label" htmlFor="client">Client</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="role" id="freelancer"
                               value="FREELANCER"/>
                        <label className="form-check-label" htmlFor="freelancer">Freelancer</label>
                    </div>
                    <hr/>
                    <button className="btn btn-block btn-lg btn-success col-12 rounded-5 mb-2 "
                            type="submit">Register
                    </button>
                    <a className="btn btn-block btn-lg btn-primary col-12 rounded-5 mb-2" href="/login">Already have an account? Log in here!</a>
                </form>
            </div>
        )
            ;
    }
}
export default Register;