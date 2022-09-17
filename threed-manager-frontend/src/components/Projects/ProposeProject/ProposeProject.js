import React, {Component, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import repository from "../../../repository/repository";

class ProposeProject extends Component{
    state={
        error:false
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        const name = form.elements.title.value;
        const description = form.elements.description.value;
        const dueDate = form.elements.dueDate.value;
        const attachments = form.elements.attachments.files;
        console.log(attachments);
        if(name==="" || description==="" || dueDate===""){
            this.setState({error: true})
        }else{
            this.setState({error: false})
            repository.proposeProject(name,description,dueDate,attachments,this.props.user.email).then(()=>{
                const navigate = this.props.navigation;
                navigate("/myProjects")
            })
        }
    }
    render(){
        if (this.props.user===null) {
            return null;
        } else return (
            <div className={"container col-6 text-dark border border-dark rounded-5 mt-4 text-center"}>
                <h1>Propose a new Project</h1>
                <h3>To Freelancer: {this.props.user.name} {this.props.user.surname}</h3>
                <hr/>
                {this.state.error && <div className="bg-danger text-white rounded-5 ps-2 pe-2 pt-1 pb-1 text-center mb-2"><h4>Please fill all the fields below!</h4></div>}
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group mb-3">
                        <input className="form-control" type="text" name="title" id="title" placeholder="Project Title"/>
                    </div>
                    <div className="form-group mb-3">
                        <textArea className="form-control" type="text" name="description" id="description" placeholder="Project Description"></textArea>
                    </div>
                    <div className="form-group mb-3 text-start">
                        <label htmlFor={"dueDate"}>Due Date</label>
                        <input className="form-control" type="date" name="dueDate" id="dueDate"/>
                    </div>
                    <div className="form-group mb-3 text-start">
                        <label htmlFor={"attachments"}>Attachments</label>
                        <input className="form-control" type="file" multiple name="attachments" id="attachments"/>
                    </div>
                    <hr/>
                    <button className={"btn btn-block btn-lg text-white btn-success col-12 rounded-5 mb-1"} type={"submit"}>Propose</button>
                    <Link to={"/freelancers"} className={"btn btn-block btn-lg text-white btn-danger col-12 rounded-5 mb-1"}>Cancel</Link>
                </form>
            </div>
        );
    }

}
export default function(props) {
    const navigation = useNavigate();

    return <ProposeProject {...props} navigation={navigation} />;
}