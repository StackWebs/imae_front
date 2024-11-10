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
import {ArrowDown, ArrowUp, MoreHorizontal} from "lucide-react";
import { ArrowUpDown } from "lucide-react"




export const columnsFormat: any[] = [
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("status")}</div>
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("email")}</div>
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row } : any) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    }
]

