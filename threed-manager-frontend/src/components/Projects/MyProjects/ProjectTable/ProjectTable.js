import React, {Component, useEffect, useState} from 'react';
import repository from "../../../../repository/repository";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons'

const ProjectTable = (props) => {
    const element = <h4><FontAwesomeIcon icon={faCircleInfo}/></h4>
    var rowsProposed = []
    return (
        <div className={"container-fluid col-12"}>
            <hr className={"m-1"}/>
            <div className={"row"}>
                <div className={"col-12 mt-2 mb-2"}>
                    {props.projects.length === 0 && <h3 className={"text-secondary fst-italic fw-bold"}>You have no projects in
                        the <span className={"badge rounded-5 text-white bg-secondary pt-1"}>{props.status==="PROPOSED"?"PROPOSED": props.status==="CANCELED"?"CANCELED":props.status==="ACCEPTED"?"IN PROGRESS":props.status==="FINISHED"?"FINISHED":"RATED"}</span> category!</h3>}

                    {props.projects.length !== 0 && localStorage.getItem("Role") === "CLIENT" && props.projects.forEach(x => rowsProposed.push((
                        <tr>
                            <td className={"align-middle col-3"}>{x.name}</td>
                            <td className={"align-middle col-4"}><Link onClick={() => props.onProfileView(x.freelancer.email,x.freelancer.role)} to={`/visitProfile/${x.freelancer.email}/${x.freelancer.role}`}>{x.freelancer.name} {x.freelancer.surname} ({x.freelancer.email})</Link></td>
                            <td className={"align-middle col-2"}>{new Date(x.dueDate).toLocaleDateString("en-US")}</td>
                            <td className={"text-center align-middle col-2"}>{x.projectTasks.length}</td>
                            <td className={"align-middle col-1"}><Link onClick={() => props.onProjectView(x.id.id)}
                                      to={`/viewProject/${x.id.id}`}>{element}</Link></td>
                        </tr>)))}
                    {props.projects.length !== 0 && localStorage.getItem("Role") === "CLIENT" &&
                        <table className={"table table-hover text-start"}>
                            <thead className={"bg-dark text-white"}>
                            <tr>
                                <th className={"col-3"}>Title</th>
                                <th className={"col-4"}>Freelancer</th>
                                <th className={"col-2"}>Due Date</th>
                                <th className={"text-center col-2"}>Number of Tasks</th>
                                <th className={"col-1"}></th>
                            </tr>
                            </thead>
                            <tbody>{rowsProposed}</tbody>
                        </table>}

                    {props.projects.length !== 0 && localStorage.getItem("Role") === "FREELANCER" && props.projects.forEach(x => rowsProposed.push((
                        <tr>
                            <td className={"align-middle col-3"}>{x.name}</td>
                            <td className={"align-middle col-4"}>{x.client.name} {x.client.surname} ({x.client.email})</td>
                            <td className={"align-middle col-2"}>{new Date(x.dueDate).toLocaleDateString("en-US")}</td>
                            <td className={"text-center align-middle col-2"}>{x.projectTasks.length}</td>
                            <td className={"align-middle col-1"}><Link onClick={() => props.onProjectView(x.id.id)}
                                      to={`/viewProject/${x.id.id}`}>{element}</Link></td>
                        </tr>)))}
                    {props.projects.length !== 0 && localStorage.getItem("Role") === "FREELANCER" &&
                        <table className={"table table-hover text-start"}>
                            <thead className={"bg-dark text-white"}>
                            <tr>
                                <th className={"col-3"}>Title</th>
                                <th className={"col-4"}>Client</th>
                                <th className={"col-2"}>Due Date</th>
                                <th className={"text-center col-2"}>Number of Tasks</th>
                                <th className={"col-1"}></th>
                            </tr>
                            </thead>
                            <tbody>{rowsProposed}</tbody>
                        </table>}

                </div>
            </div>
        </div>
    );
}

export default ProjectTable;