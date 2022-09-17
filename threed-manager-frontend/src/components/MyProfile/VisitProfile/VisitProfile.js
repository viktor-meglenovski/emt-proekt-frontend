import React, {useEffect, useState} from 'react';

const VisitProfile = (props) => {
    const buildImagePath = (path) => {
        return "http://localhost:8002/api/file?path=" + path;
    }
    let linkedAccounts = [];
    if (props.user===null) {
        return null;
    } else return (
        <div className={"container col-6 text-dark border border-dark rounded-5 mt-4 text-center"}>
            <h1>{props.user.email}'s Profile</h1>
            <hr/>
            <div className={"row"}>
                <div className={"col-6 text-start"}>
                    <h3>Username:</h3>
                    <h3>Role:</h3>
                    <h3>Full Name:</h3>
                    <h3>Number of Projects:</h3>
                    <h3>Rating:</h3>
                    {props.user.role === "CLIENT" && <h3>Company Name:</h3>}
                </div>
                <div className={"col-6 text-start"}>
                    <h3>{props.user.email}</h3>
                    <h3>{props.user.role}</h3>
                    <h3>{props.user.name} {props.user.surname}</h3>
                    <h3>{props.user.rating.grades.length}</h3>
                    <h3>{props.user.rating.rating}</h3>
                    {props.user.role === "CLIENT" && <h3>{props.user.company}</h3>}
                </div>
            </div>
            {props.user.role==="FREELANCER" && <hr className={"mt-1 mb-1"}/>}
            {props.user.role==="FREELANCER" && <h2>Linked Accounts</h2>}
            {props.user.role==="FREELANCER" && <hr className={"mt-1 mb-1"}/>}
            {props.user.role==="FREELANCER" && props.user.externalLinks.forEach(x => {linkedAccounts.push(<a href={x.link}><img style={{width:"70px"}} className={"m-2"} src={buildImagePath(x.name.imageLocation)}/></a>)})}
            {linkedAccounts}
            {props.user.role==="FREELANCER" && linkedAccounts.length===0 && <h5 className={"text-danger fst-italic"}>This freelancer has not linked any external accounts yet!</h5>}
        </div>
    )
        ;
}
export default VisitProfile;