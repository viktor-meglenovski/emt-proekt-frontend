import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile, faArrowRight, faCircleArrowUp} from '@fortawesome/free-solid-svg-icons'
import repository from "../../../../../repository/repository";
import Messages from "./Messages/Messages";
import {Link} from "react-router-dom";
import Deliveries from "./Deliveries/Deliveries";


const ViewTask = (props) => {
    const [messageError, setMessageError] = useState(false);
    const [deliveryError, setDeliveryError] = useState(false)
    const [feedbackError, setFeedbackError]=useState(false);
    const [task,setTask]=useState(props.task);
    useEffect(() => {
        reloadTask();
    }, )
    const [messages, setMessages] = useState(props.task.messages.sort((x, y) => {
        return x.postingTime.localeCompare(y.postingTime)
    }));
    const [deliveries, setDeliveries] = useState(props.task.deliveries.sort((x, y) => {
        return x.deliveryTime.localeCompare(y.deliveryTime)
    }));
    const arrow = <FontAwesomeIcon icon={faArrowRight}/>
    const send = <FontAwesomeIcon icon={faCircleArrowUp}/>
    if (task === null) {
        return null;
    }
    function reloadTask(){
        repository.loadProject(props.project.id.id).then((resp)=>{
            var task=resp.data.projectTasks.filter(x=>x.id.id===props.task.id.id)[0];
            setTask(task);
            setMessages(task.messages.sort((x, y) => {return x.postingTime.localeCompare(y.postingTime)}))
            setDeliveries(task.deliveries.sort((x, y) => {return x.deliveryTime.localeCompare(y.deliveryTime)}))
            console.log("reload")
        })
    }
    //var toClear=setInterval(reloadTask,2000);
    const sendDelivery = (content, deliveryAttachments) => {
        if (content.value === "" || deliveryAttachments.value === "") {
            setDeliveryError(true)
        } else {
            setDeliveryError(false)
            repository.sendDelivery(props.project.id.id, task.id.id, content.value, deliveryAttachments.files).then((resp) => {
                props.updateTask(resp.data)
                props.onProjectView(props.project.id.id);
                setMessages(resp.data.messages.sort((x, y) => {
                    return x.postingTime.localeCompare(y.postingTime)
                }))
                setDeliveries(resp.data.deliveries.sort((x, y) => {
                    return x.deliveryTime.localeCompare(y.deliveryTime)
                }))
            })
            content.value = "";
            deliveryAttachments.value = "";
        }
    }
    const sendMessage = (content, messageAttachments) => {
        if (content.value === "") {
            setMessageError(true)
        } else {
            setMessageError(false)
            repository.sendMessage(props.project.id.id, task.id.id, content.value, messageAttachments.files).then((resp) => {
                setMessages(resp.data.messages.sort((x, y) => {
                    return x.postingTime.localeCompare(y.postingTime)
                }))
            })
            content.value = "";
            messageAttachments.value = "";
        }
    }
    const provideFeedbackForDelivery=(feedback, status)=>{
        if(feedback.value===""){
            setFeedbackError(true);
        }else{
            setFeedbackError(false);
            repository.provideFeedbackForDelivery(props.project.id.id, task.id.id, deliveries[deliveries.length-1].id.id, feedback.value, status).then((resp) => {
                props.updateTask(resp.data)
                setMessages(resp.data.messages.sort((x, y) => {
                    return x.postingTime.localeCompare(y.postingTime)
                }))
                setDeliveries(resp.data.deliveries.sort((x, y) => {
                    return x.deliveryTime.localeCompare(y.deliveryTime)
                }))
                props.onProjectView(props.project.id.id);
            })
        }
        feedback.value="";
    }
    return (
        <div className={"container col-12 text-dark border border-dark rounded-5 mt-4 pb-1"}>
            <div className={"row"}>
                <h1 className={"col-8 text-start ps-3 fst-italic text-primary"}>
                    <Link onClick={() => props.onProjectView(props.project.id.id)}
                          to={`/viewProject/${props.project.id.id}`}
                          className={"fw-bold"}>{props.project.name}</Link> {arrow} {task.title}
                </h1>
                <h3 className={"text-end col-4"}>
                    {task.taskStatus === "STARTED" && <span
                        className={"badge bg-primary text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>IN PROGRESS</span>}
                    {task.taskStatus === "ACCEPTED" &&
                        <span className={"badge bg-success text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>FINISHED</span>}
                    {task.taskStatus === "IN_REVISION" && <span
                        className={"badge bg-danger text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>IN REVISION</span>}
                    {task.taskStatus === "DELIVERED" && <span
                        className={"badge bg-warning text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>DELIVERED</span>}</h3>
            </div>
            <hr className={"mt-0 mb-1"}/>
            <div className={"row"}>
                <div className={"col-7 ps-0"}>
                    <h3 className={"ms-3 text-center"}>Task Messages</h3>
                    <div style={{
                        height: "400px",
                        border: "1px solid gray",
                        display: "flex",
                        flexDirection: "column-reverse"
                    }} className={"overflow-auto rounded-5 mb-0 ms-1"}>
                        <Messages messages={messages}/>
                    </div>
                    {task.taskStatus !== "ACCEPTED" &&
                        <form class={"row rounded-5 m-1 border border-secondary pb-3 pt-3"} onSubmit={sendMessage}>
                            <div className={"col-10"}>
                                <textarea id={"messageContent"} name={"messageContent"}
                                          className={"form-control rounded-5"} placeholder={"Write your message..."}
                                          style={{height: "90px"}}></textarea>
                            </div>
                            <div className={"col-2 text-center"}>
                                <span className={"text-center mb-0 p-0 m-0 text-primary"}
                                      style={{fontSize: "35px"}}
                                      onMouseEnter={() => document.body.style.cursor = "pointer"}
                                      onMouseLeave={() => document.body.style.cursor = "default"}
                                      onClick={() => {
                                          sendMessage(document.getElementById("messageContent"), document.getElementById("messageAttachments"));
                                      }}>
                                    {send}
                                </span>

                                <input type={"file"} multiple className={"form-control"} id={"messageAttachments"}
                                       name={"messageAttachments"}/>
                            </div>
                            {messageError &&
                                <p className={"text-danger fst-italic ms-3 mb-0"}>Please write a message!</p>}
                        </form>}
                </div>
                <div className={"col-5 pe-0"}>
                    <h3 className={"ms-3 text-center"}>Deliveries</h3>
                    <div style={{
                        height: "400px",
                        border: "1px solid gray",
                        display: "flex",
                        flexDirection: "column-reverse"
                    }} className={"overflow-auto rounded-5 mb-0 me-1"}>
                        <Deliveries deliveries={deliveries}/>
                    </div>
                    {task.taskStatus === "DELIVERED" && localStorage.getItem("Role") === "FREELANCER" &&
                        <div className={"row rounded-5 m-1 border border-secondary pb-3 pt-1"}>
                            <h2 className={"text-primary text-center fst-italic mb-1"}>Waiting feedback from client!</h2>
                            <hr className={"m-0"}/>
                            <p className={"text-primary text-center fst-italic mb-1 col-10 offset-1 mt-1"}>You cannot make a new delivery until the client has provided a feedback on the latest delivery!</p>
                        </div>}
                    {task.taskStatus === "DELIVERED" && localStorage.getItem("Role") === "CLIENT" &&
                        <div className={"row rounded-5 m-1 border border-secondary pb-3 pt-1"}>
                            <h5 className={"text-primary text-start fst-italic mb-1"}>Provide feedback for Delivery #{deliveries.length}</h5>
                            <hr className={"m-0 mt-1 mb-1"}/>
                            <form>
                                <div className={"col-12"}>
                                    <input id={"feedback"} name={"feedback"} type={"text"} className={"form-control rounded-5"} placeholder={"Write your message..."}/>
                                </div>
                                <div className={"row text-center mt-1 mb-0"}>
                                    <div className={"col-6"}>
                                        <span className={"btn btn-success rounded-5 col-12"}
                                              onMouseEnter={() => document.body.style.cursor = "pointer"}
                                              onMouseLeave={() => document.body.style.cursor = "default"}
                                              onClick={()=>provideFeedbackForDelivery(document.getElementById("feedback"),true)}>Accept Delivery</span>
                                    </div>
                                    <div className={"col-6"}>
                                        <span className={"btn btn-danger rounded-5 col-12"}
                                              onMouseEnter={() => document.body.style.cursor = "pointer"}
                                              onMouseLeave={() => document.body.style.cursor = "default"}
                                              onClick={()=>provideFeedbackForDelivery(document.getElementById("feedback"),false)}>Request Revision</span>
                                    </div>
                                </div>
                                {feedbackError && <p className={"text-danger fst-italic ms-3 mb-0"}>Please write a message!</p>}
                            </form>
                        </div>}
                    {(task.taskStatus === "STARTED" || task.taskStatus === "IN_REVISION") && localStorage.getItem("Role") === "CLIENT" &&
                        <div className={"row rounded-5 m-1 border border-secondary pb-3 pt-1"}>
                            <h1 className={"text-primary text-center fst-italic mb-5 mt-2"}>Waiting for a delivery!</h1>
                            </div>}
                    {(task.taskStatus === "STARTED" || task.taskStatus === "IN_REVISION") && localStorage.getItem("Role") === "FREELANCER" &&
                        <form className={"row rounded-5 m-1 border border-secondary pb-3 pt-3"}>
                            <div className={"col-9"}>
                                <textarea id={"deliveryContent"} name={"deliveryContent"}
                                          className={"form-control rounded-5"} placeholder={"Write your message..."}
                                          style={{height: "90px"}}></textarea>
                            </div>
                            <div className={"col-3 text-center"}>
                                <span className={"text-center mb-0 p-0 m-0 text-success"}
                                      style={{fontSize: "35px"}}
                                      onMouseEnter={() => document.body.style.cursor = "pointer"}
                                      onMouseLeave={() => document.body.style.cursor = "default"}
                                      onClick={() => {
                                          sendDelivery(document.getElementById("deliveryContent"), document.getElementById("deliveryAttachments"));
                                      }}>
                                    {send}
                                </span>

                                <input type={"file"} multiple className={"form-control"} id={"deliveryAttachments"}
                                       name={"deliveryAttachments"}/>
                            </div>
                            {deliveryError &&
                                <p className={"text-danger fst-italic ms-3 mb-0"}>Please write a message and select files to deliver!</p>}
                        </form>}
                </div>
            </div>

        </div>
    );
}
export default ViewTask;