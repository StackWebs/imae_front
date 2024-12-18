import React, {useEffect} from "react";

import {useParams} from "react-router-dom";



export default function Haulier() {
    const { haulierId } = useParams();

    return (
        <>
            <h1>TRANSPORTISTA {haulierId}</h1>
        </>
    )
}
