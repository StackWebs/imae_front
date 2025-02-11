import React from "react"
import {Button} from "../../ui/button";
import {Pencil, Save, Trash} from "lucide-react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Api from "../../utils/Api";


export const actions: any[] = [
    {
        type: "packages",
        cell: ({ row } : any) => {
            return (
                <div className={"flex items-end justify-end"}>

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
        type: "orders",
        cell: ({ row } : any) => {
            const editLink = `/order/${row.original.id}`
            const navigate = useNavigate();

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
        type: "providers",
        cell: ({ row } : any) => {
            const editLink = `/provider/${row.original.id}`

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
        type: "hauliers",
        cell: ({ row } : any) => {
            const editLink = `/haulier/${row.original.id}`
            const navigate = useNavigate();

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
            const editLink = `/project/${row.original.id}`

            return (
                <>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to={editLink}>
                            <Pencil />
                        </Link>
                    </Button>
                    {/*
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    */}
                </>
            )
        },
    },
]

