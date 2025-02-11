"use client"

import React, {useEffect} from "react"
import _ from 'lodash';

import {ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"
import ReactLoading from 'react-loading';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "../../ui/table"
import {columnsFormat} from "./columns";
import {editColumnsFormat} from "./editColumns";
import {actions} from "./actions";
import {Button} from "../../ui/button";
import {Input} from "../../ui/input"
import {ArrowDown, ArrowUp, ArrowUpDown, X, SquarePlus, Pencil, Trash} from "lucide-react";
import api from "../../utils/Api";
import {activeColumns} from "./activeColumns";
import {filters} from "./filters";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../../ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {editActions} from "./editActions";
import {Loader} from "../../ui/loader";
import {Link, useNavigate} from "react-router-dom";
type Checked = DropdownMenuCheckboxItemProps["checked"]




function apiCalls(dataType : string, call: string, id: string ) {
    console.log('apiCalls',dataType,call,id)
    if(!id) {
        const data: any = {
            orders: {
                get: '/orders',
            },
            projects: {
                get: '/projects',
                post: '/projects'
            },
            hauliers: {
                get: '/hauliers',
                post: '/hauliers',
            },
            customers: {
                get: '/customers',
                delete: '/customers',
                post: '/customers'
            },
            providers: {
                get: '/providers',
                delete: '/providers',
                post: '/providers'
            }
        }
        return data[dataType][call] || null;
    }
    const data: any = {
        orders: {
            get: '/projects/' + id + '/orders',
            post: '/projects/' + id + '/orders',
            navigate: '/order/' + id
        },
        packages: {
            post: '/orders/' + id + '/packages',
            patch: '/packages/' + id
        },
        projects: {
            patch: '/customers/' + id,
            navigate: '/project/' + id,
            delete: '/projects/' + id
        },
        hauliers: {
            navigate: '/haulier/' + id
        },
        customers: {
            navigate: '/customer/' + id
        },
        customers_addresses: {
            get: '/customers/' + id + '/addresses'
        },
        addresses: {
            patch: '/addresses/' + id
        },
        providers: {
            navigate: '/provider/' + id
        }
    }
    return data[dataType][call] || null;

}

function getColumns(type: any, data : any[],sortedColumns : any[], sortByKey: any, edit : boolean = false) {
    const columns: any[] = []
    const dataKeys = Object.keys(data[0])

    var formatColumns = edit ? editColumnsFormat : columnsFormat

    formatColumns.forEach((column) => {
        if(!column || !column.accessorKey) return
        if (activeColumns[type] && !activeColumns[type].includes(column.accessorKey)) return

        if (dataKeys.includes(column.accessorKey)) {
            let element = {
                accessorKey: column.accessorKey,
                header: column.header,
                cell: column.cell || undefined,
            }

            const sorted = sortedColumns.find((sortedColumn) => sortedColumn.accessorKey === column.accessorKey)

            if (sorted) {
                element.header = () => {
                    return (
                        <>
                            {column.header || _.capitalize(column.accessorKey) || ""}
                            {sorted.sortDirection === "" && (
                                <Button
                                    className="h-6 w-6 p-0 ml-2"
                                    variant="ghost"
                                    onClick={() => {
                                        sortByKey(sortedColumns,column.accessorKey)
                                    }}
                                >
                                    <ArrowUpDown className="h-4 w-4 flex items-center justify-center"/>
                                </Button>
                            )}
                            {sorted.sortDirection === "asc" && (
                                <Button
                                    className="h-6 w-6 p-0 ml-2"
                                    variant="ghost"
                                    onClick={() => {
                                        sortByKey(sortedColumns,column.accessorKey)
                                    }}
                                >
                                    <ArrowUp className="h-4 w-4 flex items-center justify-center"/>
                                </Button>
                            )}
                            {sorted.sortDirection === "desc" && (
                                <Button
                                    className="h-6 w-6 p-0 ml-2"
                                    variant="ghost"
                                    onClick={() => {
                                        sortByKey(sortedColumns,column.accessorKey)
                                    }}
                                >
                                    <ArrowDown className="h-4 w-4 flex items-center justify-center"/>
                                </Button>
                            )}
                        </>
                    )
                }
            }

            columns.push(element)

        }

    })

    columns.sort((a, b) => dataKeys.indexOf(a.accessorKey) - dataKeys.indexOf(b.accessorKey))

    // Afegim les accions a la darrera columna
    const action = edit ? editActions.find((action) => action.type === type) : actions.find((action) => action.type === type)
    columns.push({
        id: "actions",
        cell: action.cell,
    })

    return {
        columns,
        newSortedColumns: sortedColumns
    }
}

export function DataTable<TData, TValue>(props: any) {

    const navigate = useNavigate();
    const type = props.type
    const id = props.id
    const content = props.content
    const edit = props.edit || false
    const [hasResults, setHasResults] = React.useState(false)
    const [data, setData] = React.useState<TData[]>([])
    const [columns, setColumns] = React.useState<ColumnDef<TData, TValue>[]>([])
    const [sortedColumns, setSortedColumns] = React.useState<any[]>([
        /*{
            accessorKey: "projectNumber",
            sortDirection: "",
        }*/
    ])
    const [page, setPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(10)
    const [totalPages, setTotalPages] = React.useState(1)
    const [activeFilters, setActiveFilters] = React.useState<any[]>(filters[type])

    function setFilterValue(filter : any, value : any) {
        var activeFilter = activeFilters
        if(activeFilter && activeFilter[filter.accessorKey]) {
            switch (filter.type) {
                case 'string':
                    activeFilter[filter.accessorKey].value = value
                    break
                case 'integer':
                    activeFilter[filter.accessorKey].value = parseInt(value)
                    break
                case 'select':
                    activeFilter[filter.accessorKey].value = value
                    break
            }
        }
        setActiveFilters(activeFilter)
    }

    function sortByKey(sortedColumns : any[],key : string) {
        let sorted = sortedColumns.find((sortedColumn) => sortedColumn.accessorKey === key)
        if (sorted) {
            if (sorted.sortDirection === "") {
                sorted.sortDirection = "asc"
            }
            else if (sorted.sortDirection === "asc") {
                sorted.sortDirection = "desc"
            }
            else if (sorted.sortDirection === "desc") {
                sorted.sortDirection = ""
            }
        }
        setSortedColumns([...sortedColumns])
    }

    useEffect(() => {
        // console.log('Get Data Variables: Sorting => ', sortedColumns)
        // console.log('Get Data Variables: Page => ', page)
        // console.log('Get Data Variables: Page Size => ', pageSize)
        // console.log('type => ', type)
        // console.log('activeFilters',activeFilters)
        // console.log('content => ', content)
        if(content) {
            setData(content)
            setPageSize(content.length)
            return
        }

        const call = apiCalls(type, 'get', id)
        if(!call) return

        //setTimeout(() => {
            api.get(call).then((res) => {
                setData(res.content)
                setTotalPages(res.data.totalPages)
                setHasResults(true)
            }).catch((err) => {
                console.error('Error: ', err)
                setHasResults(true)
            })
        //}, 2000)
    }, [sortedColumns])

    useEffect(() => {
        if(!data || data.length === 0) return
        const { columns, newSortedColumns } = getColumns(type,data,sortedColumns,sortByKey,edit)

        setColumns(columns)
        setSortedColumns(newSortedColumns)
    }, [data])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const addToTable = function() {
        console.log(data)
    }

    const rowUpdate = function(event : any) {
        event.preventDefault()

        var data : any = {}
        for (var i = 0; i < event.target.length; i++) {
            if(event.target[i].type === 'submit') continue
            data[event.target[i].id] = event.target[i].value
        }
        const id = event.target.getAttribute('element-id')
        const call = apiCalls(type, 'patch', id)
        if(!call) return

        api.patch(call,data).then((res) => {
            console.log('res',res)
        }).catch((err) => {
            console.error('Error: ', err)
        })
    }

    const addNew = function() {
        const path = apiCalls(type, 'post', id || null )
        if(!path) return
        api.post(path,{}).then((res) => {
            if(!res.id) return;
            if(!edit) {
                navigate(apiCalls(type,'navigate', res.id ))
            }
            else {
                setData([...data,res])
            }
        }).catch((err) => {
            console.error('Error: ', err)
        })
    }

    const removeRow = function(row : any) {
        const path = apiCalls(type, 'delete', row.original.id)
        if(!path) return
        api.delete(path).then((res) => {
            // @ts-ignore
            setData(data.filter((item) => item?.id !== row.original.id))
        }).catch((err) => {
            console.error('Error: ', err)
        })
    }

    return (
        <div className="py-4">
            <div className="flex flex-row justify-between">
                <div className="flex items-center py-4"></div>
                {/*!content && (
                    <div className="flex items-center py-4">
                        {filters && filters[type] && (
                            Object.keys(filters[type]).map((key) => {
                                var filter = filters[type][key]

                                switch (filter.type) {
                                    case 'string':
                                        return (
                                            <Input
                                                placeholder={filter.label}
                                                value={filter.value}
                                                onChange={(event) =>
                                                    setFilterValue(filter, event.target.value)
                                                }
                                                className="max-w-sm"
                                            />
                                        )
                                    case 'integer':
                                        return (
                                            <Input
                                                type={'number'}
                                                placeholder={filter.label}
                                                value={filter.value}
                                                onChange={(event) =>
                                                    setFilterValue(filter, event.target.value)
                                                }
                                                className="max-w-sm"
                                            />
                                        )
                                    case 'select':
                                        const [selectedValues, setSelectedValues] = React.useState(new Set<string>())

                                        return (
                                            <>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline">{filter.label}</Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="w-56">
                                                        <DropdownMenuLabel>{filter.label}</DropdownMenuLabel>
                                                        <DropdownMenuSeparator/>
                                                        {filter.options.map((option: any) => (
                                                            <DropdownMenuCheckboxItem
                                                                checked={selectedValues.has(option.label)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) selectedValues.add(option.label)
                                                                    else selectedValues.delete(option.label)

                                                                    setSelectedValues(new Set(selectedValues))
                                                                    console.log('selectedValues', selectedValues, option)
                                                                    setFilterValue(filter, selectedValues)
                                                                }}
                                                            >
                                                                {option.label}
                                                            </DropdownMenuCheckboxItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                {Array.from(selectedValues).map((value) => (
                                                    <span>{value}</span>
                                                ))}
                                            </>
                                        )
                                }
                            })
                        )}

                        {filters && filters[type] && (
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setActiveFilters(filters[type])
                                }}
                            >
                                Reset
                                <X className="ml-2 h-4 w-4"/>
                            </Button>
                        )}
                    </div>
                )*/}
                {!edit && (
                    <div className="flex items-center py-4">
                        <Button onClick={addNew}>
                            <SquarePlus  /> Añadir
                        </Button>
                    </div>
                )}
            </div>
            {table.getRowModel().rows?.length !== 0 && (
                <div className="forms">
                    {table.getRowModel().rows?.length && (
                        table.getRowModel().rows.map((row) => (
                            <form key={row.id} id={'form-' + row.id} element-id={row.id} onSubmit={rowUpdate}></form>
                        ))
                    )}
                </div>
            )}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <>
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            const isAction = cell.id.includes('actions')

                                            return (
                                                <TableCell key={cell.id}>
                                                    <>

                                                        {isAction ? (
                                                            <div className={"flex items-end justify-end"}>
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => removeRow(row)}>
                                                                    <Trash/>
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </>
                                                        )}
                                                    </>
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                </>
                            ))
                        ) : (
                            <>
                                {hasResults ? (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            <Loader/>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>
            {!content && (
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setPage(page - 1)
                        }}
                        disabled={page === 1}
                    >
                        &lt;
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setPage(page + 1)
                        }}
                        disabled={page === totalPages}
                    >
                        &gt;
                    </Button>
                </div>
            )}

            {edit && (
                <div className="flex flex-row-reverse items-center py-4">
                    <Button onClick={addNew}>
                        <SquarePlus  /> Añadir
                    </Button>
                </div>
            )}
        </div>
    )
}
