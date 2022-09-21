import React, {useState} from 'react'
import repository from "../../../../repository/repository";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

const Tasks = (props) => {
    const [taskError, setTaskError] = useState(false);
    const [tasks, setTasks] = useState(props.tasks.sort((x, y) => {
        return x.timestamp.localeCompare(y.timestamp)
    }));
    const element = <h4><FontAwesomeIcon icon={faCircleInfo}/></h4>
    const addTaskForm = (e) => {
        e.preventDefault();
        var form = e.target;
        const title = form.elements.title.value;
        if (title === "") {
            setTaskError(true);
        } else {
            setTaskError(false)
            repository.addTask(props.projectId, title).then(resp => {
                props.reloadProject(props.projectId);
                setTasks(resp.data.projectTasks.sort((x, y) => {
                    return x.timestamp.localeCompare(y.timestamp)
                }))
            })
            form.elements.title.value = "";
        }
    }
    const finishProject=(e)=>{
        e.preventDefault();
        repository.finishProject(props.projectId).then((resp)=>{
            props.reloadProject(props.projectId);
            setTasks(resp.data.projectTasks.sort((x, y) => {
                return x.timestamp.localeCompare(y.timestamp)
            }))
        })
    }
    const canFinish=()=>{
        var roleB=localStorage.getItem("Role") === "CLIENT"
        var tasksB=(tasks.length>0 && tasks.filter(x=>x.taskStatus==="ACCEPTED").length===tasks.length)
        var statusB=props.projectStatus!=="FINISHED"
        return roleB && tasksB && statusB
    }
    const tasksRows = []
    return (
        <div>
            <h2 className={"text-center mb-2"}>Tasks</h2>
            {props.tasks.length === 0 &&
                <h5 className={"text-danger fst-italic text-center"}>This project has no tasks yet!</h5>}
            {props.tasks.length !== 0 && tasks.forEach(x => tasksRows.push((<tr>
                <td className={"align-middle"}>{tasks.indexOf(x)+1}</td>
                <td className={"align-middle"}>{x.title}</td>
                <td className={"text-center align-middle"}>
                    <h5>{x.taskStatus === "STARTED" && <span
                        className={"badge bg-primary text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>IN PROGRESS</span>}
                        {x.taskStatus === "ACCEPTED" && <span
                            className={"badge bg-success text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>FINISHED</span>}
                        {x.taskStatus === "IN_REVISION" && <span
                            className={"badge bg-danger text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>IN REVISION</span>}
                        {x.taskStatus === "DELIVERED" && <span
                            className={"badge bg-warning text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>DELIVERED</span>}</h5>
                </td>
                <td className={"text-center align-middle"}><Link onClick={() => props.viewTask(props.projectId,x.id.id)} to={`/viewTask/${props.projectId}/${x.id.id}`}>{element}</Link></td>
            </tr>)))}
            {props.tasks.length !== 0 && <div>
                <table className={"table table-hover"}>
                    <thead className={"bg-dark text-white"}>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th className={"text-center"}>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasksRows}
                    </tbody>
                </table>
            </div>}
            {localStorage.getItem("Role") === "FREELANCER" &&
                <form onSubmit={addTaskForm}>
                    <div className={"row"}>
                        <div className={"col-9"}>
                            <input type="text" id="title" name="title" placeholder="Task Title" className={"form-control rounded-5"}/>
                        </div>
                        <div className={"col-3"}>
                            <button type="submit" className={"col-12 btn btn-success rounded-5 btn-block"}>Add Task</button>
                        </div>
                    </div>
                    {taskError && <div className="bg-danger text-white rounded-5 pb-2 pt-2 mb-0 text-center mt-3"><h4>Please provide a title for the new task!</h4></div>}
                </form>
            }
            {canFinish()  &&
                <form onSubmit={finishProject}>
                    <button className={"btn btn-success btn-lg btn-block rounded-5 col-12"}>Finish Project</button>
                </form>
            }
        </div>
    );
}

export default Tasks;