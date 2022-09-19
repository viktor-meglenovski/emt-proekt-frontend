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
            <td className={"p-1"}>
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

            </td>


        </tr>
    );
}

export default MessageItem;