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

        </div>
    );
}

export default Messages;