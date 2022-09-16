import React from 'react';
import {Link} from "react-router-dom";

const homepage = (props) => {

    let email = localStorage.getItem("Email");
    let role=localStorage.getItem("Role");
    let content=[];
    if (localStorage.getItem("JWT")) {
        content.push((<h1 className="mt-2">Welcome back {email}!</h1>))
        content.push((<hr className="col-10 offset-1 mt-0"/>))
        content.push((<h3>This is your <span className={"badge bg-success text-white rounded-pill"}>{role}</span> account.</h3>))
        content.push((<Link to={"/myProjects"} className="btn btn-block btn-lg btn-primary col-10 mb-4 mt-4 rounded-5">Check your projects</Link>))
        content.push((<Link to={"/editProfile"} className="btn btn-block btn-lg btn-warning text-white col-10 mb-4 rounded-5">Edit your profile</Link>))
        content.push((<a className="btn btn-block btn-lg btn-danger text-white col-10 mb-4 rounded-5" href="/login"
            onClick={() => {
                localStorage.removeItem("JWT");
                localStorage.removeItem("Email");
                localStorage.removeItem("Role");
                localStorage.removeItem("User");
            }}>Logout</a>))
    } else {
        content.push((<h1 className="mt-2">Welcome to 3D Manager!</h1>));
        content.push((<hr/>));
        content.push((<h3 className="col-10 offset-1">3D Manager is a free to use web application that allows 3D related freelancers and clients connect and helps them organize their project better.</h3>))
        content.push((<Link to={"/register"} className="btn btn-block btn-lg btn-success col-8 mt-4 mb-4 rounded-5">Become a FREELANCER or a CLIENT now!</Link>));
    }
    return (
        <div className="text-center border border-dark rounded-5 mt-5 col-8 offset-2">
            {content}
        </div>
    )
}

export default homepage;