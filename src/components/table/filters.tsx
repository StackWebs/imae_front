
export const filters : any = {
    projects : {
        projectNumber: {
            accessorKey: 'projectNumber',
            type: 'string',
            label: 'Número de Proyecto',
        },
        projectStatus : {
            accessorKey: 'projectStatus',
            type: 'select',
            label: 'Estado',
            options: [
                {label: 'Creado', value: 'CREATED'},
                {label: 'En Progreso', value: 'IN_PROGRESS'},
                {label: 'Completado', value: 'COMPLETED'},
            ],
        }
    },
    orders : {
        orderNumber: {
            accessorKey: 'orderNumber',
            type: 'string',
            label: 'Número de Orden',
        },
        orderStatus : {
            accessorKey: 'orderStatus',
            type: 'select',
            label: 'Estado',
            options: [
                {label: 'Creado', value: 'CREATED'},
                {label: 'Confirmado', value: 'CONFIRMED'},
                {label: 'En Progreso', value: 'IN_PROGRESS'},
                {label: 'Enviado', value: 'SENT'},
                {label: 'Entregado', value: 'DELIVERED'},
                {label: 'Cancelado', value: 'CANCELLED'},
                {label: 'Devuelto', value: 'RETURNED'},
            ],
        }
    },
    invoices : {
        invoiceNumber: {
            accessorKey: 'invoiceNumber',
            type: 'string',
            label: 'Número de Factura',
        },
        orderNumber: {
            accessorKey: 'orderNumber',
            type: 'string',
            label: 'Número de Orden',
        },
        invoiceStatus : {
            accessorKey: 'invoiceStatus',
            type: 'select',
            label: 'Estado',
            options: [
                {label: 'Pendiente', value: 'PENDING'},
                {label: 'Parcialmente pagado', value: 'PARTIALLY_PAID'},
                {label: 'Pagado', value: 'PAID'},
                {label: 'Vencido', value: 'DUE'},
                {label: 'Reembolsado', value: 'REFUNDED'},
                {label: 'Cancelado', value: 'CANCELLED'},
            ],
        }
    }
}
