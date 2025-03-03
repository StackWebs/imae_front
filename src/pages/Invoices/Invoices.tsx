import React from "react";

import {DataTable} from "../../components/table/table";

export default function Invoices() {

    return (
        <>
            <DataTable type={"invoices"} csvExport={true}/>
        </>
    )
}
