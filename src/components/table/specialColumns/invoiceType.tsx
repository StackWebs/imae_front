import React from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../../ui/tooltip"
import {Button} from "../../../ui/button";
import {Badge} from "../../../ui/badge";

export function InvoiceType ( type: any ) {
    type = type.type

    let badge_variant:any = 'invoice_income'
    let text = "Ingreso"
    if(type === "EXPENSE") {
        badge_variant = 'invoice_expense'
        text = "Gasto"
    }
    if(type === "AMENDED_INCOME") {
        badge_variant = 'invoice_amended_income'
        text = "Rect. Ingreso"
    }
    if(type === "AMENDED_EXPENSE") {
        badge_variant = 'invoice_amended_expense'
        text = "Rect. Gasto"
    }

    return (
        <Badge variant={badge_variant}>{text}</Badge>
    )
}
