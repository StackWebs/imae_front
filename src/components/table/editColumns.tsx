import React from "react"
import {Input} from "../../ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {statusess} from "./data";


export const editColumnsFormat: any[] = [

    {
        accessorKey: "country",
        header: "Pais",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("country"))

            return <div className="text-left font-medium">
                <Input
                    id="country"
                    placeholder="País"
                    value={test}
                    type="text"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "postalCode",
        header: "Codigo Postal",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("postalCode"))

            return <div className="text-left font-medium">
                <Input
                    id="postalCode"
                    placeholder="Codigo postal"
                    value={test}
                    type="text"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "street",
        header: "Calle",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("street"))

            return <div className="text-left font-medium">
                <Input
                    id="street"
                    placeholder="Calle"
                    value={test}
                    type="text"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "province",
        header: "Provincia",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("province"))

            return <div className="text-left font-medium">
                <Input
                    id="province"
                    placeholder="Provincia"
                    value={test}
                    type="text"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "phone",
        header: "Telefono",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("phone"))

            return <div className="text-left font-medium">
                <Input
                    id="phone"
                    placeholder="Teléfono"
                    value={test}
                    type="text"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("name"))

            return <div className="text-left font-medium">
                <Input
                    id="name"
                    placeholder="Nombre"
                    value={test}
                    type="text"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "city",
        header: "Ciudad",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("city"))

            return <div className="text-left font-medium">
                <Input
                    id="city"
                    placeholder="Ciudad"
                    value={test}
                    type="text"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row } : any) => {
            const [status, setStatus] = React.useState(row.getValue("status"))

            return <div className="text-left font-medium">
                <Select
                    value={status}
                    onValueChange={(value) => {
                        setStatus(value)
                    }}
                >
                    <SelectTrigger className="w-[300px] text-foreground">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Object.keys(statusess).map((key) => (
                                <SelectItem key={key} value={key}>
                                    {statusess[key]}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        },
    },
    {
        accessorKey: "projectNumber",
        header: "Numero de proyecto",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("projectNumber"))

            return <div className="text-left font-medium">
                <Input
                    id="projectNumber"
                    placeholder="Numero de Proyecto"
                    value={test}
                    type="text"
                    autoCapitalize="none"
                    autoComplete="email"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "description",
        header: "Descripcion",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">
                <Input
                    id="description"
                    placeholder="Descripción"
                    value={row.getValue("description")}
                    type="text"
                    autoCapitalize="none"
                    form={'form-' + row.id} />
            </div>
        },
    },
    {
        accessorKey: "height",
        header: "Altura",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("height"))

            return <div className="text-left font-medium">
                <Input
                    id="height"
                    placeholder="Altura"
                    value={test}
                    type="number"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "width",
        header: "Ancho",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("width"))

            return <div className="text-left font-medium">
                <Input
                    id="width"
                    placeholder="Ancho"
                    value={test}
                    type="number"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "length",
        header: "Longitud",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("length"))

            return <div className="text-left font-medium">
                <Input
                    id="length"
                    placeholder="Longitud"
                    value={test}
                    type="number"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "weight",
        header: "Peso",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("weight"))

            return <div className="text-left font-medium">
                <Input
                    id="weight"
                    placeholder="Peso"
                    value={test}
                    type="number"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
    {
        accessorKey: "units",
        header: "Unidades",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">
                <Input
                    id="units"
                    placeholder="Unidades"
                    value={row.getValue("units")}
                    type="number"
                    autoCapitalize="none"
                    form={'form-' + row.id} />
            </div>
        },
    },
    {
        accessorKey: "unitPrice",
        header: "Precio unitario",
        cell: ({ row } : any) => {
            return <div className="text-left font-medium">
                <Input
                    id="unitPrice"
                    placeholder="Precio unitario"
                    value={row.getValue("unitPrice")}
                    type="number"
                    autoCapitalize="none"
                    form={'form-' + row.id} />
            </div>
        },
    },
    {
        accessorKey: "totalAmount",
        header: () => <div className="text-right">Importe total</div>,
        cell: ({ row } : any) => {
            let totalAmount = row.getValue("units") * row.getValue("unitPrice")
            if(isNaN(totalAmount)) totalAmount = row.getValue("totalAmount")
            return <div className="text-right font-medium">{totalAmount.toFixed(2)}€</div>
        },
    },
    {
        accessorKey: "contactName",
        header: "Entidad",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("contactName"))

            return <div className="text-left font-medium">
                <Input
                    id="contactName"
                    placeholder="Entidad"
                    value={test}
                    type="text"
                    autoCapitalize="none"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
]

