import React, {useEffect} from "react";

import {DataTable} from "../../components/table/table";









export default function Projects() {



    return (
        <>
            {/*<a href={"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"} target="_blank" download>Download PDF</a>*/}
            <DataTable type={"projects"} edit={false}/>
        </>
    )
}
