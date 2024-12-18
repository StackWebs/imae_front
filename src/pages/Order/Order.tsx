import React from "react";

import {useParams} from "react-router-dom";



export default function Order() {
    const { orderId } = useParams();

    return (
        <>
            <h1>ORDER {orderId}</h1>
        </>
    )
}
