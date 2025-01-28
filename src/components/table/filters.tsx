
export const filters : any = {
    projects : {
        name: {
            accessorKey: 'name',
            type: 'string',
            label: 'Nombre',
        },
        orderNumber: {
            accessorKey: 'orderNumber',
            type: 'integer',
            label: 'Número de Pedido',
        },
        status: {
            accessorKey: 'status',
            type: 'select',
            label: 'Estado',
            options: [
                {label: 'Pending', value: 'pending'},
                {label: 'In Progress', value: 'in_progress'},
                {label: 'Completed', value: 'completed'},
            ],
        }
    },
}
