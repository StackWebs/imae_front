"use client"

import React, {useEffect} from "react"
import _ from 'lodash';

import {ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "../../ui/table"
import {columnsFormat} from "./columns";
import {actions} from "./actions";
import {Button} from "../../ui/button";
import {Input} from "../../ui/input"
import {ArrowDown, ArrowUp, ArrowUpDown} from "lucide-react";
import api from "../../utils/Api";
import {activeColumns} from "./activeColumns";




function apiCalls(dataType : string, call: string, id: string ) {
    if(!id) {
        const data: any = {
            orders: {
                get: '/orders'
            },
            projects: {
                get: '/projects'
            },
            hauliers: {
                get: '/hauliers'
            },
            customers: {
                get: '/customers',
                delete: '/customers'
            }
        }
        return data[dataType][call] || null;
    }
    const data: any = {
        orders: {
            get: '/projects/' + id + '/orders'
        },
        customers_addresses: {
            get: '/customers/' + id + '/addresses'
        }
    }
    return data[dataType][call] || null;

}

function getColumns(type: any, data : any[],sortedColumns : any[], sortByKey: any) {
    const columns: any[] = []
    const dataKeys = Object.keys(data[0])

    columnsFormat.forEach((column) => {
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
                    console.log('column',column)
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
    const action = actions.find((action) => action.type === type)
    columns.push({
        id: "actions",
        cell: action.cell
    })

    return {
        columns,
        newSortedColumns: sortedColumns
    }
}

export function DataTable<TData, TValue>(props: any) {

    const type = props.type
    const id = props.id
    const content = props.content
    const [data, setData] = React.useState<TData[]>([])
    const [columns, setColumns] = React.useState<ColumnDef<TData, TValue>[]>([])
    const [sortedColumns, setSortedColumns] = React.useState<any[]>([])
    const [page, setPage] = React.useState(1)
    const [pageSize, setPageSize] = React.useState(10)
    const [totalPages, setTotalPages] = React.useState(1)

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
        console.log('content => ', content)
        if(content) {
            setData(content)
            setPageSize(content.length)
            return
        }

        const call = apiCalls(type, 'get', id)
        if(!call) return

        api.get(call).then((res) => {
            setData(res.content)
            setTotalPages(res.data.totalPages)
        }).catch((err) => {
            console.error('Error: ', err)
        })
    }, [sortedColumns])

    useEffect(() => {
        if(!data || data.length === 0) return
        const { columns, newSortedColumns } = getColumns(type,data,sortedColumns,sortByKey)

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
        console.log('data',data)
    }

    return (
        <div className="py-4">
            {!content && (
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter emails..."
                        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("email")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />

                    <Button
                        size="sm"
                        onClick={addToTable}>
                        Create New
                    </Button>
                </div>
            )}
            <div className="forms">
                {table.getRowModel().rows?.length && (
                    table.getRowModel().rows.map((row) => (
                        <form key={row.id} id={'form-' + row.id} onSubmit={rowUpdate}></form>
                    ))
                )}
            </div>
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
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
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
        </div>
    )
}
