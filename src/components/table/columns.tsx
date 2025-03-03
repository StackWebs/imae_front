import React from "react"
import {Input} from "../../ui/input";
import {Status} from "./status";
import {format} from "date-fns";
import {es} from "date-fns/locale/es";


const liveChange = function(type: any, id: any, key: any, value: any) {
}


export const columnsFormat: any[] = [
    {
        accessorKey: "weight",
        header: "Peso",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("weight")}kg</div>
        },
    },
    {
        accessorKey: "length",
        header: "Longitud",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("length")}cm</div>
        },
    },
    {
        accessorKey: "width",
        header: "Anchura",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("width")}cm</div>
        },
    },
    {
        accessorKey: "height",
        header: "Altura",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("height")}cm</div>
        },
    },
    {
        accessorKey: "description",
        header: "Descripción",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("description")}</div>
        },
    },
    {
        accessorKey: "country",
        header: "País",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("country")}</div>
        },
    },
    {
        accessorKey: "invoice",
        header: "Invoice",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{"invoice"}</div>
        },
    },
    {
        accessorKey: "haulier",
        header: "Transportista",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{"haulier"}</div>
        },
    },
    {
        accessorKey: "receiver",
        header: "Destinatario",
        cell: ({ row } : any) => {
            if(row.original.receiver) {
                return <div className="text-left font-medium">{row.original.receiver.contactName || ''}</div>
            }
            return <div className="text-left font-medium"></div>
        },
    },
    {
        accessorKey: "sender",
        header: "Remitente",
        cell: ({ row } : any) => {
            if(row.original.sender) {
                return <div className="text-left font-medium">{row.original.sender.contactName ||''}</div>
            }
            return <div className="text-left font-medium"></div>
        },
    },
    {
        accessorKey: "internalNotes",
        header: "Notas Internas",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("internalNotes")}</div>
        },
    },
    {
        accessorKey: "deliveryNotes",
        header: "Notas de Entrega",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("deliveryNotes")}</div>
        },
    },
    {
        accessorKey: "estimatedDeliveryDate",
        header: "Fecha Estimada de Entrega",
        cell: ({ row } : any) => {
            const date = new Date(row.getValue("estimatedDeliveryDate"))
            const formatted = format(date, "dd/MM/yyyy", {locale: es})
            if(row.getValue("estimatedDeliveryDate") === null) return <div className="text-left font-medium"></div>
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "sentDate",
        header: "Fecha de Envío",
        cell: ({ row } : any) => {
            const date = new Date(row.getValue("sentDate"))
            const formatted = format(date, "dd/MM/yyyy", {locale: es})
            if(row.getValue("sentDate") === null) return <div className="text-left font-medium"></div>
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "orderNumber",
        header: "Número de Orden",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("orderNumber")}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row } : any) => {
            //return <div className="text-left font-medium">{row.getValue("status")}</div>
            return (
                <Status status={row.getValue("status")} />
            )
        },
    },
    {
        accessorKey: "projectStatus",
        header: "Estado",
        cell: ({ row } : any) => {
            return (
                <Status status={row.getValue("projectStatus")} type="project" />
            )
        },
    },
    {
        accessorKey: "orderStatus",
        header: "Estado",
        cell: ({ row } : any) => {
            return (
                <Status status={row.getValue("orderStatus")} type="order" />
            )
        },
    },
    {
        accessorKey: "invoiceStatus",
        header: "Estado",
        cell: ({ row } : any) => {
            return (
                <Status status={row.getValue("invoiceStatus")} type="invoice" />
            )
        },
    },
    {
        accessorKey: "deliveryDate",
        header: "Fecha de Entrega",
        cell: ({ row } : any) => {
            const date = new Date(row.getValue("deliveryDate"))
            const formatted = format(date, "dd/MM/yyyy", {locale: es})
            if(row.getValue("deliveryDate") === null) return <div className="text-left font-medium"></div>
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "iban",
        header: "IBAN",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("iban")}</div>
        },
    },
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("name")}</div>
        },
    },
    {
        accessorKey: "postalCode",
        header: "Código Postal",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("postalCode")}</div>
        },
    },
    {
        accessorKey: "street",
        header: "Calle",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("street")}</div>
        },
    },
    {
        accessorKey: "province",
        header: "Provincia",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("province")}</div>
        },
    },
    {
        accessorKey: "phone",
        header: "Telefono",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("phone")}</div>
        },
    },
    {
        accessorKey: "contactName",
        header: "Contacto",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("contactName")}</div>
        },
    },
    {
        accessorKey: "city",
        header: "Ciudad",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("city")}</div>
        },
    },
    {
        accessorKey: "nif",
        header: "NIF",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("nif")}</div>
        },
    },
    {
        accessorKey: "companyName",
        header: "Compañia",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("companyName")}</div>
        },
    },
    {
        accessorKey: "projectNumber",
        header: "Número de Proyecto",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("projectNumber")}</div>
        },
    },
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("id")}</div>
        },
    },
    {
        accessorKey: "endDate",
        header: "Fecha de Finalización",
        cell: ({ row } : any) => {
            const date = new Date(row.getValue("endDate"))
            const formatted = format(date, "dd/MM/yyyy", {locale: es})
            if(row.getValue("endDate") === null) return <div className="text-left font-medium"></div>
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "creationDate",
        header: "Fecha de Creación",
        cell: ({ row } : any) => {
            const date = new Date(row.getValue("creationDate"))
            const formatted = format(date, "dd/MM/yyyy", {locale: es})
            if(row.getValue("creationDate") === null) return <div className="text-left font-medium"></div>
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row } : any) => {
            return (
                <div className="text-left font-medium">
                    <a href="mailto:{row.getValue('email')}">{row.getValue("email")}</a>
                </div>
            )
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
    },
    {
        accessorKey: "invoiceNumber",
        header: "Número de Factura",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("invoiceNumber")}</div>
        },
    },
    {
        accessorKey: "invoiceType",
        header: "Tipo de Factura",
        cell: ({ row } : any) => {
            return <div className={`text-left font-medium ${row.getValue("invoiceType") === "INCOME" ? "text-green-500" : "text-red-500"}
            `}>{row.getValue("invoiceType") === "INCOME" ? "Ingreso" : "Gasto"}</div>
        },
    },
    {
        accessorKey: "emissionDate",
        header: "Fecha de Emisión",
        cell: ({ row } : any) => {
            const date = new Date(row.getValue("emissionDate"))
            const formatted = format(date, "dd/MM/yyyy", {locale: es})
            if(row.getValue("emissionDate") === null) return <div className="text-left font-medium"></div>
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "dueDate",
        header: "Fecha de Vencimiento",
        cell: ({ row } : any) => {
            const date = new Date(row.getValue("dueDate"))
            const formatted = format(date, "dd/MM/yyyy", {locale: es})
            if(row.getValue("dueDate") === null) return <div className="text-left font-medium"></div>
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "taxes",
        header: "Impuestos",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("taxes")}</div>
        },
    },
    {
        accessorKey: "providerNumber",
        header: "Número de Proveedor",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("providerNumber")}</div>
        },
    },
    {
        accessorKey: "customerNumber",
        header: "Número de Cliente",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("customerNumber")}</div>
        },
    },
    {
        accessorKey: "totalAmount",
        header: () => <div className="text-right">Total</div>,
        cell: ({ row } : any) => {
            return <div className="text-right font-medium">{row.getValue("totalAmount").toFixed(2)}€</div>
        },
    },
    {
        accessorKey: "subtotalAmount",
        header: () => <div className="text-right">Subtotal</div>,
        cell: ({ row } : any) => {
            return <div className="text-right font-medium">{row.getValue("subtotalAmount").toFixed(2)}€</div>
        },
    },
    {
        accessorKey: "taxesAmount",
        header: () => <div className="text-right">Impuestos</div>,
        cell: ({ row } : any) => {
            return <div className="text-right font-medium">{row.getValue("taxesAmount").toFixed(2)}€</div>
        },
    },
    {
        accessorKey: "customerReference",
        header: "Referencia de Cliente",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("customerReference")}</div>
        },
    },
]

