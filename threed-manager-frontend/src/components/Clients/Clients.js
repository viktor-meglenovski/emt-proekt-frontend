import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import repository from "../../repository/repository";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'

const Clients = (props) => {
    const [allClients, setAllClients] = useState([]);
    const element = <FontAwesomeIcon icon={faStar}/>
    const loadAllClients = () => {
        repository.loadClients().then((resp) => {
            setAllClients(resp.data);
        })
    }
    useEffect(() => {
        loadAllClients();
    }, [])

    const clients = []
    var i = 0;
    return (
        <div className={"container col-10 text-dark border border-dark rounded-5 mt-4 text-center"}>
            <h1 className={"mt-2"}>Clients</h1>
            <hr/>
            {allClients.forEach(x => {
                clients.push((<tr>
                    <td className={"align-middle"}>{x.name} {x.surname}</td>
                    <td className={"align-middle"}>{x.email}</td>
                    <td className={"align-middle"}>{x.rating.rating} {element}</td>
                    <td className={"align-middle"}><Link onClick={() => props.onView(x.email, x.role)}
                                                         to={`/visitProfile/${x.email}/${x.role}`}
                                                         className={"btn btn-block col-12 btn-primary rounded-5 mb-2"}>Visit
                        Profile</Link></td>
                </tr>));
            })}

            <table className={"table table-bordered table-hover"}>
                <thead className={"bg-dark text-white"}>
                <tr>
                    <th className={"col-4"}>Full Name</th>
                    <th className={"col-4"}>Email</th>
                    <th className={"col-2"}>Rating</th>
                    <th className={"col-2"}></th>
                </tr>
                </thead>
                <tbody>
                {clients}
                </tbody>
            </table>
        </div>
    );
}
export default Clients;