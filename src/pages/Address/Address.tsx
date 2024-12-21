import React from "react";

import {useParams} from "react-router-dom";



export default function Address() {
    const { addressId } = useParams();

    return (
        <>
            <h1>ADDRESS {addressId}</h1>
        </>
    )
}
