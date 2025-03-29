import React, {useEffect} from "react";

import {DataTable} from "../../components/table/table";


export default function Projects() {
    return (
        <>
            <DataTable type={"projects"} edit={false}/>
        </>
    )
}
