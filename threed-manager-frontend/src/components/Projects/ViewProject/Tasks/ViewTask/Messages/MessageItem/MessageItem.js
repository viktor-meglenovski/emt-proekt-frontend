import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-solid-svg-icons'

const MessageItem = (props) => {
    var attachments = []
    const element = <FontAwesomeIcon icon={faFile}/>
    const buildFilePath = (path) => {
        return "http://localhost:8003/api/project/downloadFile?filePath=" + path;
    }
    var dateTime=props.message.postingTime.split("T")
    var time=dateTime[1].split(":")
    return (
        <tr className={"container-fluid col-12"}>
            {props.message.metadata ==="NONE" && <td className={"p-1"}>
                <div className={"row"}>
                    <h4 className={"col-auto fw-bold"}>{props.message.entryPoster.name} {props.message.entryPoster.surname}</h4>
                    <p className={"col text-secondary mb-0 pt-1 ps-0 mt-1"} style={{fontSize: "12px"}}>({new Date(dateTime[0]).toLocaleDateString("en-US")} - {time[0]}:{time[1]})</p>
                    <h5 className={"col-2 text-end ps-0"}><span className={"badge rounded-5 bg-dark text-white"}>{props.message.entryPoster.role}</span></h5>
                </div>
                    <p className={"mb-1"}>{props.message.content}</p>
                    {props.message.messageAttachments.length>0 &&
                        <div>
                            <p className={"fst-italic text-secondary mb-0"}>Attachments:</p>
                            {props.message.messageAttachments.forEach(x=>attachments.push((<a className={"d-inline me-4"} href={buildFilePath(x.attachmentPath)} download style={{textDecoration: "none"}}>{element} {x.attachmentName}</a>)))}
                            {attachments}
                        </div>
                    }
            </td>}
            {props.message.metadata === "DELIVERED" && <td className={"p-1 rounded-2"} style={{background: "rgba(255, 255, 0, 0.2)"}}>
                <div className={"row mb-0"}>
                    <h4 className={"col-auto fw-bold mb-0"}>Task Delivery</h4>
                    <p className={"col text-secondary mb-0 pt-1 ps-0 mt-1"} style={{fontSize: "12px"}}>({new Date(dateTime[0]).toLocaleDateString("en-US")} - {time[0]}:{time[1]})</p>
                    <h5 className={"col-2 text-end ps-0"}><span className={"badge rounded-5 bg-dark text-white"}>{props.message.entryPoster.role}</span></h5>
                </div>
                <p style={{fontSize:"14px"}} className={"text-secondary fst-italic mt-0 mb-1"}>{props.message.entryPoster.name} {props.message.entryPoster.surname} has made a new delivery! Check it out in the Deliveries tab!</p>
                <p className={"mb-1"}>{props.message.content}</p>
            </td>}
            {props.message.metadata === "REVISION" && <td className={"p-1 rounded-2"} style={{background: "rgba(255, 0, 0, 0.15)"}}>
                <div className={"row mb-0"}>
                    <h4 className={"col-auto fw-bold mb-0"}>Revision Requested</h4>
                    <p className={"col text-secondary mb-0 pt-1 ps-0 mt-1"} style={{fontSize: "12px"}}>({new Date(dateTime[0]).toLocaleDateString("en-US")} - {time[0]}:{time[1]})</p>
                    <h5 className={"col-2 text-end ps-0"}><span className={"badge rounded-5 bg-dark text-white"}>{props.message.entryPoster.role}</span></h5>
                </div>
                <p style={{fontSize:"14px"}} className={"text-secondary fst-italic mt-0 mb-1"}>{props.message.entryPoster.name} {props.message.entryPoster.surname} has requested a revision!</p>
                <p className={"mb-1"}>{props.message.content}</p>
            </td>}
            {props.message.metadata === "ACCEPTED" && <td className={"p-1 rounded-2"} style={{background: "rgba(0, 255, 0, 0.15)"}}>
                <div className={"row mb-0"}>
                    <h4 className={"col-auto fw-bold mb-0"}>Delivery Accepted</h4>
                    <p className={"col text-secondary mb-0 pt-1 ps-0 mt-1"} style={{fontSize: "12px"}}>({new Date(dateTime[0]).toLocaleDateString("en-US")} - {time[0]}:{time[1]})</p>
                    <h5 className={"col-2 text-end ps-0"}><span className={"badge rounded-5 bg-dark text-white"}>{props.message.entryPoster.role}</span></h5>
                </div>
                <p style={{fontSize:"14px"}} className={"text-secondary fst-italic mt-0 mb-1"}>Congrats! {props.message.entryPoster.name} {props.message.entryPoster.surname} has accepted your delivery! This task has been marked as COMPLETED!</p>
                <p className={"mb-1"}>{props.message.content}</p>
            </td>}
        </tr>
    );
}

export default MessageItem;