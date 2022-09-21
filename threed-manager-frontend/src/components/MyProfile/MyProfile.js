import React from 'react';
import {Link} from "react-router-dom";

const MyProfile=(props)=>{
    const buildImagePath=(path)=>{
        return "http://localhost:8002/api/file?path="+path;
    }
    const linkedAccounts=[];
    return (
        <div className={"container col-6 text-dark border border-dark rounded-5 mt-4 text-center"}>
            <h1>Your Profile</h1>
            <hr/>
            <div className={"row"}>
                <div className={"col-6 text-start"}>
                    <h3>Username:</h3>
                    <h3>Role:</h3>
                    <h3>Full Name:</h3>
                    <h3>Rating:</h3>
                    {localStorage.getItem("Role")==="CLIENT" && <h3>Company Name:</h3>}
                </div>
                <div className={"col-6 text-start"}>
                    <h3>{props.user.email}</h3>
                    <h3>{localStorage.getItem("Role")}</h3>
                    <h3>{props.user.name} {props.user.surname}</h3>
                    <h3>{props.user.rating.rating}</h3>
                    {localStorage.getItem("Role")==="CLIENT" && <h3>{props.user.company}</h3>}

                </div>
            </div>
            <hr className={"mb-2 mt-1"}/>
            <Link to={"/editProfile"} className={"btn btn-block btn-lg btn-warning text-white rounded-5 col-12 mt-0 mb-2"}>Edit your Profile</Link>
            {localStorage.getItem("Role")==="FREELANCER" && <hr className={"mb-1 mt-1"}/>}
            {localStorage.getItem("Role")==="FREELANCER" && <h3>Linked Accounts</h3>}
            {localStorage.getItem("Role")==="FREELANCER" && props.user.externalLinks.forEach(x => {linkedAccounts.push(<a href={x.link}><img style={{width:"70px"}} className={"m-2"} src={buildImagePath(x.name.imageLocation)}/></a>)})}
            {linkedAccounts}
            {localStorage.getItem("Role")==="FREELANCER" && <hr className={"mb-1 mt-1"}/>}
            {localStorage.getItem("Role")==="FREELANCER" && <Link to={"/linkAccounts"} className={"btn btn-block btn-lg btn-primary text-white rounded-5 col-12 mt-0 mb-2"}>Manage Linked Accounts</Link>}
            {localStorage.getItem("Role")==="CLIENT" && <Link to={"/changeCompany"} className={"btn btn-block btn-lg btn-primary text-white rounded-5 col-12 mt-0 mb-2"}>Change Company</Link>}

        </div>
    );
}
export default MyProfile;