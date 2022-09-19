import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

const header = (props) => {

    let email = localStorage.getItem("Email");
    let role = localStorage.getItem("Role");
    let authenticate=[];
    if (localStorage.getItem("JWT")) {

        authenticate.push((<h3 className="col-auto ms-5"><Link className="text-white float-end" to={"/myProfile"}>{email}</Link></h3>));
        if(role==="FREELANCER"){
            authenticate.push((<h3 className="col-auto ms-5"><Link className="text-white float-end" to={"/clients"}>Clients</Link></h3>));
        }else{
            authenticate.push((<h3 className="col-auto ms-5"><Link className="text-white float-end" to={"/freelancers"}>Freelancers</Link></h3>));
        }
        authenticate.push((<h3 className="col-auto ms-5"><Link className="text-white float-end" to={"/myProjects"}>My Projects</Link></h3>))

        authenticate.push((<h3 className="col-1 ms-5"><a className="text-dark badge bg-white rounded-pill float-end" href="/login"
                                                    onClick={() => {
                                                        localStorage.removeItem("JWT");
                                                        localStorage.removeItem("Email");
                                                        localStorage.removeItem("Role");
                                                        localStorage.removeItem("User");
                                                    }}>Logout</a></h3>));
    } else {
        authenticate.push(<h3 className="col-2"><Link className="text-dark badge bg-white rounded-pill float-end col-12" to={"/register"}>Register</Link></h3>)
        authenticate.push(<h3 className="col-2"><Link className="text-dark badge bg-white rounded-pill float-end col-12" to={"/login"}>Login</Link></h3>);
    }


    return (

        <header className="bg-dark text-white row">
            <h1 className="col-3"><Link className="navbar-brand d-inline ms-2" to={"/home"}>3D Manager</Link></h1>
            <div className="row col-9 mt-2 justify-content-end">
                {authenticate}
            </div>

        </header>
    )
}

export default header;