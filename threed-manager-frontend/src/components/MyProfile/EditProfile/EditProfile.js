import React, {Component} from 'react';
import {Link, useNavigate} from "react-router-dom";
import repository from "../../../repository/repository";

class EditProfile extends Component {
    state = {
        emptyInputsError: false,
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        var name=form.elements.name.value;
        var surname=form.elements.surname.value;
        repository.editProfile(name,surname).then(resp=>{
            this.setState({emptyInputsError: false})
            if (!resp.data.hasOwnProperty("errorInformation")){
                this.props.reloadUser();
                const navigate = this.props.navigation;
                navigate("/myProfile")
            }else{
                this.setState({emptyInputsError: true})
            }
        })
    }
    render(){return (
        <div className={"container col-6 text-dark border border-dark rounded-5 mt-4"}>
            <h1 className={"text-center mt-1"}>Edit your Profile</h1>
            <hr/>
            <div className={"row"}>
                <h3 className={"col-6 fst-italic"}>{this.props.user.email}</h3>
                <h3 className={"col-6 fst-italic text-end"}><span
                    className={"badge bg-primary rounded-pill rounded-5"}>{localStorage.getItem("Role")}</span></h3>
            </div>
            <hr/>
            <div className="text-danger mb-2">
                {this.state.emptyInputsError &&
                    <div className="bg-danger text-white rounded-5 ps-2 pe-2 pt-1 pb-1 text-center"><h4>First Name and Last Name cannot be empty!</h4></div>}
            </div>
            <form onSubmit={this.onFormSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">First Name</label>
                    <input className="form-control" type="text" name="name" id="name"
                           placeholder={this.props.user.name}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="surname">Last Name</label>
                    <input className="form-control" type="text" name="surname" id="surname"
                           placeholder={this.props.user.surname}/>
                </div>
                <button className={"btn btn-block btn-lg btn-success text-white rounded-5 col-12 mt-0 mb-2"}
                        type="submit">Save changes
                </button>
                <Link to={"/myProfile"}
                      className="btn btn-block btn-lg btn-danger col-12 rounded-5 mb-2 h2">Cancel</Link>
            </form>
        </div>
    )}
}
export default function(props) {
    const navigation = useNavigate();

    return <EditProfile {...props} navigation={navigation} />;
}