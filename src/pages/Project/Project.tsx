import React, {useEffect} from "react";

import {useParams} from "react-router-dom";



export default function Project() {
    const { projectId } = useParams();

    return (
        <>
            <h1>PROJECT {projectId}</h1>
        </>
    )
}
