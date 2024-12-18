import React from "react"
import {Button} from "../../ui/button";
import {Pencil, Trash} from "lucide-react";
import {Link} from "react-router-dom";



export const actions: any[] = [
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Trash />
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Trash />
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Trash />
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
                <div className={"flex items-end justify-end"}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to={editLink}>
                            <Pencil />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Trash />
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
                </div>
            )
        },
    },
]

