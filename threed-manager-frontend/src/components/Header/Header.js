import React from 'react';
import {Link} from 'react-router-dom';

const header = (props) => {

    let email = localStorage.getItem("Email");
    let role = localStorage.getItem("Role");

    let authenticate;
    if (localStorage.getItem("JWT")) {
        authenticate = [(<Link className="text-white" to={"/myProfile"}>{email} - {role}</Link>),
            (<a className="text-white" href="/login"
                           onClick={() => {
                               localStorage.removeItem("JWT");
                               localStorage.removeItem("Email");
                               localStorage.removeItem("Role")
                           }}>Logout</a>)]
    } else {
        authenticate = (<Link className="text-white" to={"/login"}>Login</Link>);
    }


    return (
        <header className="bg-dark text-white">
            <a className="navbar-brand" href="/home">3D Manager</a>
            {authenticate}
        </header>
    )
}

export default header;