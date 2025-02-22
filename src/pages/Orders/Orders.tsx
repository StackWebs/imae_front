import React, {useEffect} from "react";

import {DataTable} from "../../components/table/table";
import { useToast } from "../../hooks/use-toast"
import {Button} from "../../ui/button";








export default function Orders() {

    const { toast } = useToast()

    return (
        <>
            <DataTable type={"orders"} create={false}/>
        </>
    )
}
