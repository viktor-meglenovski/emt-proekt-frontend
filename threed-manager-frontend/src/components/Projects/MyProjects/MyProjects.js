import React, {Component, useEffect, useState} from 'react';
import repository from "../../../repository/repository";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons'




const MyProjects = (props) => {
    const [proposedProjects, setProposedProjects] = useState([]);
    const [acceptedProjects, setAcceptedProjects] = useState([]);
    const [declinedProjects, setDeclinedProjects] = useState([]);
    const [finishedProjects, setFinishedProjects] = useState([]);
    const element = <FontAwesomeIcon icon={faCircleInfo} />
    const loadProposedProjects = () => {
        repository.loadProjectsByStatus("PROPOSED").then((resp) => {
            setProposedProjects(resp.data)
            console.log("Proposed: " + resp.data)
        })
    }
    const loadAcceptedProjects = () => {
        repository.loadProjectsByStatus("ACCEPTED").then((resp) => {
            setAcceptedProjects(resp.data)
            console.log("Accepted: " + resp.data)
        })
    }
    const loadDeclinedProjects = () => {
        repository.loadProjectsByStatus("DECLINED").then((resp) => {
            setDeclinedProjects(resp.data)
            console.log("Declined: " + resp.data)
        })
    }
    const loadFinishedProjects = () => {
        repository.loadProjectsByStatus("FINISHED").then((resp) => {
            setFinishedProjects(resp.data)
            console.log("Finished: " + resp.data)
        })
    }
    var rowsProposed=[]
    var rowsAccepted=[]
    var rowsDeclined=[]
    var rowsFinished=[]
    useEffect(() => {
        loadFinishedProjects();
        loadDeclinedProjects();
        loadAcceptedProjects();
        loadProposedProjects();
    }, [])
    return (
        <div className={"container-fluid col-12 text-dark border border-dark rounded-5 mt-4 text-center"}>
            <h1>My Projects</h1>
            <hr className={"m-1"}/>
            <div className={"row"}>
                <div className={"col-3"}>
                    <h3>Proposed Projects</h3>
                    <hr className={"m-1"}/>
                    {proposedProjects.length===0 && <h5 className={"text-danger fst-italic"}>This list is empty!</h5>}

                    {proposedProjects.length!==0 && localStorage.getItem("Role")==="CLIENT" && proposedProjects.forEach(x=>rowsProposed.push((<tr><td>{x.name}</td><td>{x.freelancer.email}</td><td>{new Date(x.dueDate).toLocaleDateString("en-US")}</td><td><Link onClick={() => props.onProjectView(x.id.id)} to={`/viewProject/${x.id.id}`}>{element}</Link></td></tr>)))}
                    {proposedProjects.length!==0 && localStorage.getItem("Role")==="CLIENT" && <table className={"table table-hover"}><thead className={"bg-dark text-white"}><th>Title</th><th>Freelancer</th><th>Due Date</th><th></th></thead><tbody>{rowsProposed}</tbody></table>}

                    {proposedProjects.length!==0 && localStorage.getItem("Role")==="FREELANCER" && proposedProjects.forEach(x=>rowsProposed.push((<tr><td>{x.name}</td><td>{x.client.email}</td><td><Link to={"/viewProject"} className={""}>{element}</Link></td></tr>)))}
                    {proposedProjects.length!==0 && localStorage.getItem("Role")==="FREELANCER" && <table className={"table table-hover"}><thead className={"bg-dark text-white"}><th>Title</th><th>Client</th><th>Due Date</th><th></th></thead><tbody>{rowsProposed}</tbody></table>}

                </div>
                <div className={"col-3"}>
                    <h3>In Progress</h3>
                    <hr className={"m-1"}/>
                    {acceptedProjects.length===0 && <h5 className={"text-danger fst-italic"}>This list is empty!</h5>}

                    {acceptedProjects.length!==0 && localStorage.getItem("Role")==="CLIENT" && acceptedProjects.forEach(x=>rowsProposed.push((<tr><td>{x.name}</td><td>{x.freelancer.email}</td><td><Link to={"/viewProject"} className={""}>{element}</Link></td></tr>)))}
                    {acceptedProjects.length!==0 && localStorage.getItem("Role")==="CLIENT" && <table className={"table table-hover"}><thead className={"bg-dark text-white"}><th>Title</th><th>Freelancer</th><th></th></thead><tbody>{rowsProposed}</tbody></table>}

                    {acceptedProjects.length!==0 && localStorage.getItem("Role")==="FREELANCER" && acceptedProjects.forEach(x=>rowsProposed.push((<tr><td>{x.name}</td><td>{x.client.email}</td><td><Link to={"/viewProject"} className={""}>{element}</Link></td></tr>)))}
                    {acceptedProjects.length!==0 && localStorage.getItem("Role")==="FREELANCER" && <table className={"table table-hover"}><thead className={"bg-dark text-white"}><th>Title</th><th>Client</th><th></th></thead><tbody>{rowsProposed}</tbody></table>}

                </div>
                <div className={"col-3"}>
                    <h3>Finished Projects</h3>
                    <hr className={"m-1"}/>
                    {finishedProjects.length===0 && <h5 className={"text-danger fst-italic"}>This list is empty!</h5>}

                    {finishedProjects.length!==0 && localStorage.getItem("Role")==="CLIENT" && finishedProjects.forEach(x=>rowsProposed.push((<tr><td>{x.name}</td><td>{x.freelancer.email}</td><td><Link to={"/viewProject"} className={""}>{element}</Link></td></tr>)))}
                    {finishedProjects.length!==0 && localStorage.getItem("Role")==="CLIENT" && <table className={"table table-hover"}><thead className={"bg-dark text-white"}><th>Title</th><th>Freelancer</th><th></th></thead><tbody>{rowsProposed}</tbody></table>}

                    {finishedProjects.length!==0 && localStorage.getItem("Role")==="FREELANCER" && finishedProjects.forEach(x=>rowsProposed.push((<tr><td>{x.name}</td><td>{x.client.email}</td><td><Link to={"/viewProject"} className={""}>{element}</Link></td></tr>)))}
                    {finishedProjects.length!==0 && localStorage.getItem("Role")==="FREELANCER" && <table className={"table table-hover"}><thead className={"bg-dark text-white"}><th>Title</th><th>Client</th><th></th></thead><tbody>{rowsProposed}</tbody></table>}

                </div>
                <div className={"col-3"}>
                    <h3>Canceled Projects</h3>
                    <hr className={"m-1"}/>
                    {declinedProjects.length===0 && <h5 className={"text-danger fst-italic"}>This list is empty!</h5>}

                    {declinedProjects.length!==0 && localStorage.getItem("Role")==="CLIENT" && declinedProjects.forEach(x=>rowsProposed.push((<tr><td>{x.name}</td><td>{x.freelancer.email}</td><td><Link to={"/viewProject"} className={""}>{element}</Link></td></tr>)))}
                    {declinedProjects.length!==0 && localStorage.getItem("Role")==="CLIENT" && <table className={"table table-hover"}><thead className={"bg-dark text-white"}><th>Title</th><th>Freelancer</th><th></th></thead><tbody>{rowsProposed}</tbody></table>}

                    {declinedProjects.length!==0 && localStorage.getItem("Role")==="FREELANCER" && declinedProjects.forEach(x=>rowsProposed.push((<tr><td>{x.name}</td><td>{x.client.email}</td><td><Link to={"/viewProject"} className={""}>{element}</Link></td></tr>)))}
                    {declinedProjects.length!==0 && localStorage.getItem("Role")==="FREELANCER" && <table className={"table table-hover"}><thead className={"bg-dark text-white"}><th>Title</th><th>Client</th><th></th></thead><tbody>{rowsProposed}</tbody></table>}

                </div>
            </div>
        </div>
    );
}

export default MyProjects;