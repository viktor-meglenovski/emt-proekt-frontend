import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import repository from "../../repository/repository";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'

const Freelancers = (props) => {
    const [allFreelancers, setAllFreelancers] = useState([]);
    const element = <FontAwesomeIcon icon={faStar}/>
    const loadAllFreelancers = () => {
        repository.loadFreelancers().then((resp) => {
            setAllFreelancers(resp.data);
        })
    }
    useEffect(() => {
        loadAllFreelancers();
    }, [])

    const freelancers = []
    return (
        <div className={"container col-10 text-dark border border-dark rounded-5 mt-4 text-center"}>
            <h1 className={"mt-2"}>Freelancers</h1>
            <hr/>
            {allFreelancers.forEach(x => {
                freelancers.push((<tr>
                    <td className={"align-middle"}>{x.name} {x.surname}</td>
                    <td className={"align-middle"}>{x.email}</td>
                    <td className={"align-middle"}>{x.rating.rating} {element}</td>
                    <td className={"align-middle"}><Link onClick={() => props.onView(x.email, x.role)}
                                                         to={`/visitProfile/${x.email}/${x.role}`}
                                                         className={"btn btn-block col-12 btn-primary rounded-5 mb-2"}>Visit
                        Profile</Link></td>
                    <td className={"align-middle"}><Link to={`/proposeProject/${x.email}`}
                                                         onClick={() => props.onPropose(x.email, x.role)}
                                                         className={"btn btn-block col-12 btn-success rounded-5 mb-2"}>Propose
                        a Project</Link></td>
                </tr>));
            })}

            <table className={"table table-bordered table-hover"}>
                <thead className={"bg-dark text-white"}>
                <tr>
                    <th className={"col"}>Full Name</th>
                    <th className={"col"}>Email</th>
                    <th className={"col"}>Rating</th>
                    <th className={"col-2"}></th>
                    <th className={"col-2"}></th>
                </tr>
                </thead>
                <tbody>
                {freelancers}
                </tbody>
            </table>
        </div>
    );
}
export default Freelancers;