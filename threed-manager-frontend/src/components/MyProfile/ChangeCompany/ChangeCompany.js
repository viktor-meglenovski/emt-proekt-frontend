import React, {Component} from 'react';
import {Link, useNavigate} from "react-router-dom";
import repository from "../../../repository/repository";
class ChangeCompany extends Component{
    onFormSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        var company=form.elements.company.value;
        repository.changeCompany(company).then(resp=>{
            this.props.reloadUser();
            const navigate = this.props.navigation;
            navigate("/myProfile")
        })
    }
    render(){
        return (
            <div className={"container col-6 text-dark border border-dark rounded-5 mt-4"}>
                <h1 className={"text-center"}>Change your Company</h1>
                <hr/>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="company">Company</label>
                        <input className="form-control" type="text" name="company" id="company" placeholder={this.props.user.company}/>
                    </div>
                    <hr/>
                    <button className="btn btn-block btn-large btn-success col-12 rounded-5 mb-2 " type="submit">Change Company</button>
                    <Link className="btn btn-block btn-large btn-danger col-12 rounded-5 mb-2" to={"/myProfile"}>Cancel</Link>
                </form>
            </div>
        );
    }
}
export default function(props) {
    const navigation = useNavigate();
    return <ChangeCompany {...props} navigation={navigation} />;
}