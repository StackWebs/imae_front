import React, {useEffect} from "react";

import {DataTable} from "../../components/table/table";
import { useToast } from "../../hooks/use-toast"
import {Button} from "../../ui/button";








export default function Orders() {

    const { toast } = useToast()

    return (
        <>
            <DataTable type={"orders"} editable={true}/>
            <Button
                onClick={() => {
                    toast({
                        title: "Scheduled: Catch up",
                        description: "Friday, February 10, 2023 at 5:57 PM",
                    })
                }}
            >
                Show Toast
            </Button>
        </>
    )
}
