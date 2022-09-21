import React from 'react';
import MessageItem from "./MessageItem/MessageItem";

const Messages = (props) => {
    var messageItems = []
    return (
        <div className={"container-fluid col-12"}>
            {props.messages.forEach(x => messageItems.push((<MessageItem message={x}/>)))}
            <table className={"table table-hover"}>
                <tbody>
                {messageItems}
                </tbody>
            </table>
            {props.messages.length===0 && <h4 className={"fst-italic text-warning"}>There are no messages yet on this task!</h4>}
            {props.messages.length===0 && <h5 className={"fst-italic text-warning"}>Start by writing a message below!</h5>}
        </div>
    );
}

export default Messages;