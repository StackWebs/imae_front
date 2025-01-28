import React from "react"
import {Input} from "../../ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../../ui/select";
import {statusess} from "./data";


const liveChange = function(type: any, id: any, key: any, value: any) {
    console.log('liveChange',type,id,key,value)
}


export const editColumnsFormat: any[] = [

    {
        accessorKey: "country",
        header: "Pais",
        cell: ({ row } : any) => {
            const [test, setTest] = React.useState(row.getValue("country"))

            return <div className="text-left font-medium">
                <Input
                    id="country"
                    placeholder="country"
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
                    placeholder="postalCode"
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
                    placeholder="street"
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
                    placeholder="province"
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
                    placeholder="phone"
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
                    placeholder="name"
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
                    placeholder="city"
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
                    placeholder="projectNumber"
                    value={test}
                    type="text"
                    autoCapitalize="none"
                    autoComplete="email"
                    form={'form-' + row.id}
                    onChange={(e) => setTest(e.target.value)}/>
            </div>
        },
    },
]

