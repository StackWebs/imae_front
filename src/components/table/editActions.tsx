import React from "react"
import {Button} from "../../ui/button";
import {Pencil, Save, Trash} from "lucide-react";
import {Link, useLocation} from "react-router-dom";
import Api from "../../utils/Api";

function deleteCustomer(id:number) {
    Api.delete('/customers/' + id )
}
function deleteOrder(id:number) {
    //Api.delete('/orders/' + id )
}

export const editActions: any[] = [
    {
        type: "packages",
        cell: ({ row } : any) => {
            return (
                <div className={"flex items-end justify-end"}>
                    <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 p-0" form={'form-' + row.id}>
                        <Save />
                    </Button>
                </div>
            )
        },
    },
    {
        type: "addresses",
        cell: ({ row } : any) => {
            const editLink = `/address/${row.original.id}`
            console.log('editLink',editLink)
            return (
                <div className={"flex items-end justify-end"}>
                    <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 p-0" form={'form-' + row.id}>
                        <Save />
                    </Button>
                </div>
            )
        },
    },
    {
        type: "address",
        cell: ({ row } : any) => {
            const editLink = `/address/${row.original.id}`
            console.log('editLink',editLink)
            return (
                <div className={"flex items-end justify-end"}>
                    <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 p-0" form={'form-' + row.id}>
                        <Save />
                    </Button>
                </div>
            )
        },
    },
    {
        type: "orders",
        cell: ({ row } : any) => {
            const editLink = `/order/${row.original.id}`

            return (
                <div className={"flex items-end justify-end"}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to={editLink}>
                            <Pencil />
                        </Link>
                    </Button>
                </div>
            )
        },
    },
    {
        type: "customers",
        cell: ({ row } : any) => {
            const editLink = `/customer/${row.original.id}`

            return (
                <div className={"flex items-end justify-end"}>
                    <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 p-0" form={'form-' + row.id}>
                        <Save />
                    </Button>
                </div>
            )
        },
    },
    {
        type: "hauliers",
        cell: ({ row } : any) => {
            const editLink = `/haulier/${row.original.id}`

            return (
                <div className={"flex items-end justify-end"}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to={editLink}>
                            <Pencil />
                        </Link>
                    </Button>
                </div>
            )
        },
    },
    {
        type: "projects",
        cell: ({ row } : any) => {

            return (
                <div className={"flex items-end justify-end"}>
                    <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 p-0" form={'form-' + row.id}>
                        <Save />
                    </Button>
                </div>
            )
        },
    },
]

