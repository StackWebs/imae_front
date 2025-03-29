import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import {cn} from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        invoice_income: "border-invoice_income bg-invoice_income_bg text-invoice_income shadow",
        invoice_expense: "border-invoice_expense bg-invoice_expense_bg text-invoice_expense shadow",
        invoice_amended_income: "border-invoice_amended_income bg-invoice_amended_income_bg text-invoice_amended_income shadow",
        invoice_amended_expense: "border-invoice_amended_expense bg-invoice_amended_expense_bg text-invoice_amended_expense shadow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
