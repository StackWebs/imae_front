import React, {useEffect} from "react";

import {useParams} from "react-router-dom";
import {DataTable} from "../../components/table/table";



export default function Project() {
    const { projectId } = useParams();

    return (
        <>
            <DataTable type={"orders"} id={projectId}/>
        </>
    )
}
