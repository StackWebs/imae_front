import React from "react"
import {Input} from "../../ui/input";
import {Status} from "./status";


const liveChange = function(type: any, id: any, key: any, value: any) {
    console.log('liveChange',type,id,key,value)
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
            console.log('row',row)
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
        header: "Data Estimada Entrega",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("estimatedDeliveryDate")}</div>
        },
    },
    {
        accessorKey: "sentDate",
        header: "Data Enviament",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("sentDate")}</div>
        },
    },
    {
        accessorKey: "orderNumber",
        header: "Número de Pedido",
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
        accessorKey: "deliveryDate",
        header: "Data Entrega",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("deliveryDate")}</div>
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
        header: "Project Number",
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
        header: "Data Finalització",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("endDate")}</div>
        },
    },
    {
        accessorKey: "creationDate",
        header: "Data Creación",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("creationDate")}</div>
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
            return <div className="text-left font-medium">{row.getValue("invoiceType")}</div>
        },
    },
    {
        accessorKey: "emissionDate",
        header: "Fecha de Emisión",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("emissionDate")}</div>
        },
    },
    {
        accessorKey: "dueDate",
        header: "Fecha de Vencimiento",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("dueDate")}</div>
        },
    },
    {
        accessorKey: "taxes",
        header: "Impuestos",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">{row.getValue("taxes")}</div>
        },
    },
]

