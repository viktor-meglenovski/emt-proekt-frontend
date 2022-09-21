import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-solid-svg-icons'

const DeliveryItem = (props) => {
    var attachments = []
    const element = <FontAwesomeIcon icon={faFile}/>
    const buildFilePath = (path) => {
        return "http://localhost:8003/api/project/downloadFile?filePath=" + path;
    }
    var dateTime = props.delivery.deliveryTime.split("T")
    var time = dateTime[1].split(":")


    if(props.delivery.deliveryStatus==="PENDING"){
        return (<div className={"rounded-5 mb-2 ps-3 pe-3 pt-1 pb-2"} style={{background: "rgba(255, 255, 0, 0.2)"}}>
            <div className={"row"}>
                <h5 className={"col-auto"}>Delivery #{props.number} </h5>
                {props.delivery.deliveryStatus==="PENDING" && <p className={"col ps-0 ms-0"}><span className={"badge rounded-5 bg-warning text-white ms-2"} style={{fontSize:"12px"}}>{props.delivery.deliveryStatus}</span></p>}
                {props.delivery.deliveryStatus==="ACCEPTED" && <p className={"col ps-0 ms-0"}><span className={"badge rounded-5 bg-success text-white ms-2"} style={{fontSize:"12px"}}>{props.delivery.deliveryStatus}</span></p>}
                {props.delivery.deliveryStatus==="DECLINED" && <p className={"col ps-0 ms-0"}><span className={"badge rounded-5 bg-danger text-white ms-2"} style={{fontSize:"12px"}}>{props.delivery.deliveryStatus}</span></p>}
                <p className={"col-3 text-secondary mb-0 pt-1 ps-0 mt-1"}
                   style={{fontSize: "12px"}}>({new Date(dateTime[0]).toLocaleDateString("en-US")} - {time[0]}:{time[1]})</p>
            </div>
            <p className={"mb-1"}>{props.delivery.content}</p>
            {props.delivery.deliveryAttachments.length > 0 &&
                <div>
                    <p className={"fst-italic text-secondary mb-0"}>Delivered Items:</p>
                    {props.delivery.deliveryAttachments.forEach(x => attachments.push((
                        <a className={"d-inline me-4 text-warning"} href={buildFilePath(x.attachmentPath)} download
                           style={{textDecoration: "none"}}>{element} {x.attachmentName}</a>)))}
                    {attachments}
                </div>
            }
        </div>)
    }else if(props.delivery.deliveryStatus==="ACCEPTED"){
        return (<div className={"rounded-5 mb-2 ps-3 pe-3 pt-1 pb-2"} style={{background: "rgba(0, 255, 0, 0.2)"}}>
            <div className={"row"}>
                <h5 className={"col-auto"}>Delivery #{props.number} </h5>
                {props.delivery.deliveryStatus==="PENDING" && <p className={"col ps-0 ms-0"}><span className={"badge rounded-5 bg-warning text-white ms-2"} style={{fontSize:"12px"}}>{props.delivery.deliveryStatus}</span></p>}
                {props.delivery.deliveryStatus==="ACCEPTED" && <p className={"col ps-0 ms-0"}><span className={"badge rounded-5 bg-success text-white ms-2"} style={{fontSize:"12px"}}>{props.delivery.deliveryStatus}</span></p>}
                {props.delivery.deliveryStatus==="DECLINED" && <p className={"col ps-0 ms-0"}><span className={"badge rounded-5 bg-danger text-white ms-2"} style={{fontSize:"12px"}}>{props.delivery.deliveryStatus}</span></p>}
                <p className={"col-3 text-secondary mb-0 pt-1 ps-0 mt-1"}
                   style={{fontSize: "12px"}}>({new Date(dateTime[0]).toLocaleDateString("en-US")} - {time[0]}:{time[1]})</p>
            </div>
            <p className={"mb-1"}>{props.delivery.content}</p>
            {props.delivery.deliveryAttachments.length > 0 &&
                <div>
                    <p className={"fst-italic text-secondary mb-0"}>Delivered Items:</p>
                    {props.delivery.deliveryAttachments.forEach(x => attachments.push((
                        <a className={"d-inline me-4 text-success"} href={buildFilePath(x.attachmentPath)} download
                           style={{textDecoration: "none"}}>{element} {x.attachmentName}</a>)))}
                    {attachments}
                </div>
            }
        </div>)
    }else{
        return (<div className={"rounded-5 mb-2 ps-3 pe-3 pt-1 pb-2"} style={{background: "rgba(255, 0, 0, 0.2)"}}>
            <div className={"row"}>
                <h5 className={"col-auto"}>Delivery #{props.number} </h5>
                {props.delivery.deliveryStatus==="PENDING" && <p className={"col ps-0 ms-0"}><span className={"badge rounded-5 bg-warning text-white ms-2"} style={{fontSize:"12px"}}>{props.delivery.deliveryStatus}</span></p>}
                {props.delivery.deliveryStatus==="ACCEPTED" && <p className={"col ps-0 ms-0"}><span className={"badge rounded-5 bg-success text-white ms-2"} style={{fontSize:"12px"}}>{props.delivery.deliveryStatus}</span></p>}
                {props.delivery.deliveryStatus==="DECLINED" && <p className={"col ps-0 ms-0"}><span className={"badge rounded-5 bg-danger text-white ms-2"} style={{fontSize:"12px"}}>{props.delivery.deliveryStatus}</span></p>}
                <p className={"col-3 text-secondary mb-0 pt-1 ps-0 mt-1"}
                   style={{fontSize: "12px"}}>({new Date(dateTime[0]).toLocaleDateString("en-US")} - {time[0]}:{time[1]})</p>
            </div>
            <p className={"mb-1"}>{props.delivery.content}</p>
            {props.delivery.deliveryAttachments.length > 0 &&
                <div>
                    <p className={"fst-italic text-secondary mb-0"}>Delivered Items:</p>
                    {props.delivery.deliveryAttachments.forEach(x => attachments.push((
                        <a className={"d-inline me-4 text-danger"} href={buildFilePath(x.attachmentPath)} download
                           style={{textDecoration: "none"}}>{element} {x.attachmentName}</a>)))}
                    {attachments}
                </div>
            }
        </div>)
    }

}

export default DeliveryItem;