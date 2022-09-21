import React, {useEffect, useState} from 'react';
import repository from "../../../repository/repository";
import ProjectTable from "./ProjectTable/ProjectTable";


const MyProjects = (props) => {
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState(props.status);
    const loadProjects = (st) => {
        repository.loadProjectsByStatus(st).then((resp) => {
            setStatus(st);
            setProjects(resp.data)
        })
    }
    useEffect(() => {
        loadProjects(status);
    }, [])
    return (
        <div className={"container-fluid col-12 text-dark border border-dark rounded-5 mt-4 text-center"}>
            <h1>My Projects</h1>
            <hr className={"mt-3 mb-1"}/>
            <div className={"row"}>
                <div class={"col"}>
                    {status === "PROPOSED" && <button className={"col-10 btn btn-info text-white rounded-5"} onClick={() => {
                        loadProjects("PROPOSED")
                    }}><h3>Proposed</h3></button>}
                    {status !== "PROPOSED" && <button className={"col-10 btn btn-dark text-white rounded-5"} onClick={() => {
                        loadProjects("PROPOSED")
                    }}><h3>Proposed</h3></button>}
                </div>
                <div className={"col"}>
                    {status === "ACCEPTED" && <button className={"col-10 btn btn-primary rounded-5"} onClick={() => {
                        loadProjects("ACCEPTED")
                    }}><h3>In Progress</h3></button>}
                    {status !== "ACCEPTED" && <button className={"col-10 btn btn-dark text-white rounded-5"} onClick={() => {
                        loadProjects("ACCEPTED")
                    }}><h3>In Progress</h3></button>}
                </div>
                <div className={"col"}>
                    {status === "FINISHED" && <button className={"col-10 btn btn-success rounded-5"} onClick={() => {
                        loadProjects("FINISHED")
                    }}><h3>Finished</h3></button>}
                    {status !== "FINISHED" && <button className={"col-10 btn btn-dark text-white rounded-5"} onClick={() => {
                        loadProjects("FINISHED")
                    }}><h3>Finished</h3></button>}
                </div>
                <div className={"col"}>
                    {status === "CANCELED" && <button className={"col-10 btn btn-danger rounded-5"} onClick={() => {
                        loadProjects("CANCELED")
                    }}><h3>Canceled</h3></button>}
                    {status !== "CANCELED" && <button className={"col-10 btn btn-dark text-white rounded-5"} onClick={() => {
                        loadProjects("CANCELED")
                    }}><h3>Canceled</h3></button>}
                </div>
                <div className={"col"}>
                    {status === "RATED" && <button className={"col-10 btn btn-warning text-white rounded-5"} onClick={() => {
                        loadProjects("RATED")
                    }}><h3>Rated</h3></button>}
                    {status !== "RATED" && <button className={"col-10 btn btn-dark text-white rounded-5"} onClick={() => {
                        loadProjects("RATED")
                    }}><h3>Rated</h3></button>}
                </div>


                <ProjectTable status={status} onProjectView={props.onProjectView} projects={projects} onProfileView={props.onProfileView}/>
            </div>
        </div>
    );
}

export default MyProjects;