import React from 'react';
import {Link} from "react-router-dom";

const homepage = (props) => {

    let email = localStorage.getItem("Email");
    let content;
    if (localStorage.getItem("JWT")) {
        content=(<div><h1>Welcome back {email}!</h1></div>)
    } else {
        content=[(<h1>Welcome to 3D Manager!</h1>),(<Link to={"/register"}>Become a FREELANCER or a CLIENT now!</Link>)]
    }
    return (
        <div>
            {content}
        </div>
    )
}

export default homepage;