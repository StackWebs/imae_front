import React from "react";

import {useParams} from "react-router-dom";



export default function Customer() {
    const { customerId } = useParams();

    return (
        <>
            <h1>CLIENTE {customerId}</h1>
        </>
    )
}
