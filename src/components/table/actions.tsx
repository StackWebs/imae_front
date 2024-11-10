import React from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {Button} from "../../ui/button";
import {ArrowDown, ArrowUp, ChevronRight, MoreHorizontal, Pencil, Trash} from "lucide-react";
import { ArrowUpDown } from "lucide-react"
import {Link} from "react-router-dom";




export const actions: any[] = [
    {
        type: "test",
        cell: ({ row } : any) => {
            const payment = row.original

            return (
                <div className={"flex items-end"}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to="expeditions">
                            <Pencil />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Trash />
                    </Button>
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
                </div>
            )
        },
    },
]

