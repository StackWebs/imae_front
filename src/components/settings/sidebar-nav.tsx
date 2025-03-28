"use client"

import { buttonVariants } from "../../ui/button"
import {cn} from "../../lib/utils";
import React from "react";
import {Link} from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
    }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Link
                    to={item.href}
                    className={cn(buttonVariants({ variant: "outline" }))}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    )
}
