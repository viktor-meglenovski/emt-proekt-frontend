import React from 'react';
import DeliveryItem from "./DeliveryItem/DeliveryItem";

const Deliveries = (props) => {
    var deliveryItems = []
    return (
        <div className={"container-fluid col-12"}>
            {props.deliveries.forEach(x => deliveryItems.push((<DeliveryItem delivery={x} number={props.deliveries.indexOf(x)+1}/>)))}
            {deliveryItems}
            {props.deliveries.length===0 && <h5 className={"text-center fst-italic text-warning"}>There are no deliveries yet on this task!</h5>}
        </div>
    );
}

export default Deliveries;