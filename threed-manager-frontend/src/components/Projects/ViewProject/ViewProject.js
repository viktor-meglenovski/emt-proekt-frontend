import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-solid-svg-icons'
import repository from "../../../repository/repository";
import Tasks from "./Tasks/Tasks";

const ViewProject = (props) => {
    const buildFilePath = (path) => {
        return "http://localhost:8003/api/project/downloadFile?filePath=" + path;
    }
    const acceptProposal=(projectId)=>{
        repository.acceptProposal(projectId).then((resp)=>{
            props.reloadProject(projectId);
        })

    }
    const declineProposal=(projectId)=>{
        repository.declineProposal(projectId).then((resp)=>{
            props.reloadProject(projectId);
        })
    }
    const element = <FontAwesomeIcon icon={faFile}/>
    const attachments = []
    if (props.project === null) {
        return null;
    } else if(localStorage.getItem("Role")==="CLIENT"){
        return ( <div className={"container col-6 text-dark border border-dark rounded-5 mt-4"}>
            <div className={"row"}>
                <h1 className={"col-8 text-start ps-3 fst-italic"}>{props.project.name}</h1>
                <h3 className={"text-end col-4"}>
                    {props.project.status==="PROPOSED" && <span className={"badge bg-info text-white rounded-5 col-12 mt-2"}>{props.project.status}</span>}
                    {props.project.status==="CANCELED" && <span className={"badge bg-danger text-white rounded-5 col-12 mt-2"}>{props.project.status}</span>}
                    {props.project.status==="ACCEPTED" && <span className={"badge bg-primary text-white rounded-5 col-12 mt-2"}>IN PROGRESS</span>}
                    {props.project.status==="FINISHED" && <span className={"badge bg-success text-white rounded-5 col-12 mt-2"}>{props.project.status}</span>}
                </h3>
            </div>
            <hr className={"mt-0 mb-1"}/>
            <div class={"row"}>
                <h5 className={"text-start col-7"}>Project Description</h5>
                <h5 className={"col-5 text-end fst-italic text-secondary"}>Due: {new Date(props.project.dueDate).toLocaleDateString("en-US")}</h5>
            </div>

            <p className={"col-8 text-start"}>{props.project.description}</p>
            <hr className={"mt-0 mb-1"}/>
            <h5 className={"text-start"}>Project Attachments</h5>
            {props.project.attachments.length > 0 && props.project.attachments.forEach(x => {
                attachments.push((<a className={"d-block"} href={buildFilePath(x.attachmentPath)} download
                                     style={{textDecoration: "none"}}>{element} {x.attachmentName}</a>))
            })}
            {props.project.attachments.length === 0 &&
                <p className={"text-danger fst-italic"}>This project has no attachments!</p>}
            {attachments}
            <hr className={"mb-1"}/>
            {props.project.status === "PROPOSED" &&
                <div><h4 className={"text-primary fst-italic text-center m-2"}>Awaiting answer from freelancer</h4><hr/>
                    <button onClick={()=>declineProposal(props.project.id.id)} className={"btn btn-danger btn-lg btn-block rounded-5 col-12 mb-2"}>Cancel Proposal</button></div>}
            {props.project.status==="CANCELED" && <div><h3 className={"text-danger fst-italic text-center mb-3"}>This project has been canceled! :(</h3></div>}
            {props.project.status !== "PROPOSED" && props.project.status !=="CANCELED" &&
                <div>
                    <Tasks tasks={props.project.projectTasks} projectId={props.project.id.id} reloadProject={props.reloadProject} viewTask={props.viewTask}/>
                </div>
            }
            <hr/>
            <Link to={"/myProjects"} className={"btn btn-block btn-lg rounded-5 btn-primary col-12 mb-2"}>Go back to My Projects</Link>
        </div>);
    } else if(localStorage.getItem("Role")==="FREELANCER"){
        return(
            <div className={"container col-6 text-dark border border-dark rounded-5 mt-4"}>
                <div className={"row"}>
                    <h1 className={"col-8 text-start ps-3 fst-italic"}>{props.project.name}</h1>
                    <h3 className={"text-end col-4"}>
                        {props.project.status==="PROPOSED" && <span className={"badge bg-info text-white rounded-5 col-12 mt-2"}>{props.project.status}</span>}
                        {props.project.status==="CANCELED" && <span className={"badge bg-danger text-white rounded-5 col-12 mt-2"}>{props.project.status}</span>}
                        {props.project.status==="ACCEPTED" && <span className={"badge bg-primary text-white rounded-5 col-12 mt-2"}>IN PROGRESS</span>}
                        {props.project.status==="FINISHED" && <span className={"badge bg-success text-white rounded-5 col-12 mt-2"}>{props.project.status}</span>}
                    </h3>
                </div>
                <hr className={"mt-0 mb-1"}/>
                <h5 className={"text-start"}>Project Description</h5>
                <p className={"col-8 text-start"}>{props.project.description}</p>
                <hr className={"mt-0 mb-1"}/>
                <h5 className={"text-start"}>Project Attachments</h5>
                {props.project.attachments.length > 0 && props.project.attachments.forEach(x => {
                    attachments.push((<a className={"d-block"} href={buildFilePath(x.attachmentPath)} download style={{textDecoration: "none"}}>{element} {x.attachmentName}</a>))
                })}
                {props.project.attachments.length === 0 &&
                    <p className={"text-danger fst-italic"}>This project has no attachments!</p>}
                {attachments}
                <hr className={"mb-1"}/>


                {props.project.status === "PROPOSED" &&
                    <div>
                        <h4 className={"text-center mb-3"}>Answer this proposal</h4>
                        <button onClick={()=>acceptProposal(props.project.id.id)} className={"btn btn-success btn-lg btn-block rounded-5 col-12 mb-2"}>Accept Proposal</button>
                        <button onClick={()=>declineProposal(props.project.id.id)} className={"btn btn-danger btn-lg btn-block rounded-5 col-12 mb-2"}>Decline Proposal</button>
                        <hr className={"mt-1 mb-2"}/>
                    </div>}

                {props.project.status !== "PROPOSED" && props.project.status !=="CANCELED" &&
                    <div>
                        <Tasks tasks={props.project.projectTasks} projectId={props.project.id.id} reloadProject={props.reloadProject} viewTask={props.viewTask}/>
                    </div>
                }
                <hr/>
                <Link to={"/myProjects"} className={"btn btn-block btn-lg rounded-5 btn-primary col-12 mb-2"}>Go back to My Projects</Link>
            </div>
        );
    }
}
export default ViewProject;