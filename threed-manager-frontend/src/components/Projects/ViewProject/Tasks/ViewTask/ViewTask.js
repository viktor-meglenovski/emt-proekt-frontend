import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile, faArrowRight, faCircleArrowUp} from '@fortawesome/free-solid-svg-icons'
import repository from "../../../../../repository/repository";
import Messages from "./Messages/Messages";
import {Link} from "react-router-dom";


const ViewTask = (props) => {
    const [messageError, setMessageError] = useState(false);
    const [messages, setMessages] = useState(props.task.messages.sort((x,y)=>{return x.postingTime.localeCompare(y.postingTime)}));
    const buildFilePath = (path) => {
        return "http://localhost:8003/api/project/downloadFile?filePath=" + path;
    }
    const file = <FontAwesomeIcon icon={faFile}/>
    const arrow = <FontAwesomeIcon icon={faArrowRight}/>
    const send = <FontAwesomeIcon icon={faCircleArrowUp}/>
    if (props.task === null) {
        return null;
    }
    const sendMessage = (e) => {
        e.preventDefault();
        var form = e.target;
        const content=form.elements.messageContent.value;
        const messageAttachments=form.elements.messageAttachments.files;
        if(content===""){
            setMessageError(true)
        }else{
            setMessageError(false)
            repository.sendMessage(props.project.id.id,props.task.id.id,content,messageAttachments).then((resp)=>{
                setMessages(resp.data.messages.sort((x,y)=>{return x.postingTime.localeCompare(y.postingTime)}))
            })
            form.elements.messageContent.value="";
        }
    }
    const sendMessageTest = (content,messageAttachments) => {
        if(content===""){
            setMessageError(true)
        }else{
            setMessageError(false)
            repository.sendMessage(props.project.id.id,props.task.id.id,content.value,messageAttachments.files).then((resp)=>{
                setMessages(resp.data.messages.sort((x,y)=>{return x.postingTime.localeCompare(y.postingTime)}))
            })
            content.value="";
            messageAttachments.value="";
            console.log(messageAttachments);
            console.log(messageAttachments.files);
        }
    }
    return (
        <div className={"container col-12 text-dark border border-dark rounded-5 mt-4"}>
            <div className={"row"}>
                <h1 className={"col-8 text-start ps-3 fst-italic text-primary"}>
                    <Link onClick={() => props.onProjectView(props.project.id.id)} to={`/viewProject/${props.project.id.id}`} className={"fw-bold"}>{props.project.name}</Link> {arrow} {props.task.title}
                </h1>
                <h3 className={"text-end col-4"}>
                    {props.task.taskStatus === "STARTED" && <span
                        className={"badge bg-primary text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>IN PROGRESS</span>}
                    {props.task.taskStatus === "ACCEPTED" &&
                        <span className={"badge bg-success text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>FINISHED</span>}
                    {props.task.taskStatus === "IN_REVISION" && <span
                        className={"badge bg-danger text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>IN REVISION</span>}
                    {props.task.taskStatus === "DELIVERED" && <span
                        className={"badge bg-warning text-white rounded-5 col-6 mt-2 pt-2 pb-2"}>DELIVERED</span>}</h3>
            </div>
            <hr className={"mt-0 mb-1"}/>
            <div className={"row"}>
                <div className={"col-7 ps-0"}>
                    <h3 className={"ms-3"}>Chat</h3>
                    <div style={{height: "400px", border:"1px solid gray",display:"flex",flexDirection:"column-reverse"}} className={"overflow-auto rounded-5 mb-0 ms-1"}>
                        <Messages messages={messages} />
                    </div>
                    {props.task.taskStatus !== "ACCEPTED" &&
                        <form class={"row rounded-5 m-1 border border-secondary pb-3 pt-3"} onSubmit={sendMessage}>
                            <div className={"col-10"}>
                                <textarea id={"messageContent"} name={"messageContent"} className={"form-control rounded-5"} placeholder={"Write your message..."} style={{height:"90px"}}></textarea>
                            </div>
                            <div className={"col-2 text-center"}>
                                <span className={"text-center mb-0 p-0 m-0 text-primary"}
                                      style={{fontSize:"35px"}}
                                    onMouseEnter={()=>document.body.style.cursor = "pointer"}
                                    onMouseLeave={()=>document.body.style.cursor = "pointer"}
                                    onClick={()=>{
                                        sendMessageTest(document.getElementById("messageContent"),document.getElementById("messageAttachments"));
                                        }}>
                                    {send}
                                </span>

                                <input type={"file"} multiple className={"form-control"} id={"messageAttachments"} name={"messageAttachments"}/>
                            </div>
                            {messageError && <p className={"text-danger fst-italic ms-3 mb-0"}>Please write a message</p>}
                        </form>}
                </div>
                <div className={"col-5 pe-0"}>
                    <h3 className={"ms-3"}>Deliveries</h3>
                    <div style={{height: "400px", backgroundColor: "lightgray"}} className={"overflow-auto rounded-5 mb-0 me-1"}>
                        //list all deliverables

                        //freelancer -> form for submitting a delivery

                        //clients -> each delivery has buttons accept, request revision

                    </div>
                    {(props.task.taskStatus === "STARTED" || props.task.taskStatus==="IN_REVISION") && localStorage.getItem("Role")!=="CLIENT" &&
                        <form class={"row rounded-5 m-1 border border-secondary pb-3 pt-3"}>
                            <div className={"col-9 m-0"}>
                                <textarea id={"deliveryContent"} name={"deliveryContent"} className={"form-control rounded-5 m-0"} placeholder={"Write your message..."}></textarea>
                            </div>
                            <div className={"col-3"}>
                                <button className={"btn btn-success text-white btn-block col-12 rounded-5 mb-1"}>Deliver</button>
                                <input type={"file"} multiple className={"form-control"} id={"deliveryAttachments"} name={"deliveryAttachments"}/>
                            </div>
                        </form>}
                </div>
            </div>

        </div>
    );
}
export default ViewTask;