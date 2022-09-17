import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-solid-svg-icons'
import repository from "../../../repository/repository";

const ViewProject = (props) => {
    const buildFilePath = (path) => {
        return "http://localhost:8003/api/project/downloadFile?filePath=" + path;
    }
    const downloadAttachment=(path, name)=>{
        repository.downloadFile(path).then((resp)=>{
            let url = window.URL.createObjectURL(new Blob(resp.data,{ type: "text/plain" }));
            let a = document.createElement('a');
            a.href = url;
            a.download = name;
            a.click();
        })
    }
    const element = <FontAwesomeIcon icon={faFile} />
    const attachments=[]
    if (props.project === null) {
        return null;
    } else return (
        <div className={"container col-6 text-dark border border-dark rounded-5 mt-4"}>
            <div className={"row"}>
                <h1 className={"col-8 text-start ps-3 fst-italic"}>{props.project.name}</h1>
                <h3 className={"text-end col-4"}><span className={"badge bg-info text-white rounded-5 col-12 mt-2"}>{props.project.status.projectStatusEnumeration}</span></h3>
            </div>
            <hr className={"mt-0 mb-1"}/>
            <h5 className={"text-start"}>Project Description</h5>
            <p className={"col-8 text-start"}>{props.project.description}</p>
            <hr className={"mt-0 mb-1"}/>
            <h5 className={"text-start"}>Project Attachments</h5>
            {props.project.attachments.length>0 && props.project.attachments.forEach(x=>{attachments.push((<a className={"d-block"} href={buildFilePath(x.attachmentPath)} download  style={{textDecoration:"none"}}>{element} {x.attachmentName}</a>))}) }
            {props.project.attachments.length===0 && <p className={"text-danger fst-italic"}>This project has no attachments!</p>}
            {attachments}
            <hr className={"mb-1"}/>
            <h3 className={"text-start fst-italic mb-2"}>Tasks</h3>
            {props.project.projectTasks.length===0 && <h4 className={"text-danger fst-italic text-start"}>There are no tasks on this project!</h4>}
            <hr/>
            <Link to={"/myProjects"} className={"btn btn-block btn-lg rounded-5 btn-primary col-12 mb-2"}>Go back to My Projects</Link>
        </div>
    );
}
export default ViewProject;