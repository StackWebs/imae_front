import React from "react"
import {Button} from "../../ui/button";
import {Pencil, DownloadIcon, Eye, ListTree, Loader2} from "lucide-react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Api from "../../utils/Api";
import api from "../../utils/Api";


async function downloadInvoice(id: any, action = 'download') {
    api.get('/invoices/' + id + '/generate_pdf', 'arraybuffer').then((res) => {
        const blob = new Blob([res], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(blob);
        if(action === 'download') {
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = 'invoice.pdf';
            a.click();
        }
        else {
            window.open(pdfUrl, "_blank");
        }
    }).catch((err) => {
        console.log(err)
    })
}

export const actions: any[] = [
    {
        type: "packages",
        cell: ({ row } : any) => {
            return (
                <div className={"flex items-end justify-end"}>

                </div>
            )
        },
    },
    {
        type: "addresses",
        cell: ({ row } : any) => {
            const editLink = `/address/${row.original.id}`
            return (
                <div className={"flex items-end justify-end"}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to={editLink}>
                            <Pencil />
                        </Link>
                    </Button>
                </div>
            )
        },
    },
    {
        type: "orders",
        cell: ({ row } : any) => {
            const editLink = `/order/${row.original.id}`
            const navigate = useNavigate();

            return (
                <div className={"flex items-end justify-end"}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to={editLink}>
                            <Pencil />
                        </Link>
                    </Button>
                </div>
            )
        },
    },
    {
        type: "customers",
        cell: ({ row } : any) => {
            const editLink = `/customer/${row.original.id}`

            return (
                <div className={"flex items-end justify-end"}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to={editLink}>
                            <Pencil />
                        </Link>
                    </Button>
                </div>
            )
        },
    },
    {
        type: "providers",
        cell: ({ row } : any) => {
            const editLink = `/provider/${row.original.id}`

            return (
                <div className={"flex items-end justify-end"}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to={editLink}>
                            <Pencil />
                        </Link>
                    </Button>
                </div>
            )
        },
    },
    {
        type: "hauliers",
        cell: ({ row } : any) => {
            const editLink = `/haulier/${row.original.id}`
            const navigate = useNavigate();

            return (
                <div className={"flex items-end justify-end"}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to={editLink}>
                            <Pencil />
                        </Link>
                    </Button>
                </div>
            )
        },
    },
    {
        type: "projects",
        cell: ({ row } : any) => {
            const editLink = `/project/${row.original.id}`

            return (
                <>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to={editLink}>
                            <ListTree  />
                        </Link>
                    </Button>
                    {/*
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    */}
                </>
            )
        },
    },
    {
        type: "invoices",
        cell: ({ row } : any) => {

            const [downloading, setDownloading] = React.useState<boolean>(false)
            const editLink = `/invoice/${row.original.id}`

            return (
                <>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                        <Link to={editLink}>
                            <Pencil />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => {
                        setDownloading(true)
                        downloadInvoice(row.original.id,'download').then(() => {
                            setDownloading(false)
                        })
                    }}>
                        {!downloading ? (
                            <DownloadIcon />
                        ) : (
                            <Loader2 className="animate-spin" />
                        )}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => downloadInvoice(row.original.id,'preview')}>
                        <Eye />
                    </Button>
                </>
            )
        },
    },
]

