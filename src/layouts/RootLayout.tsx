import React, {useEffect} from "react";
import {Link, MemoryRouter, Outlet, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Login from "../pages/Auth/Login";
import {ArrowLeftFromLine, Trash} from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Separator } from "../ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../ui/sidebar"
import {AppSidebar} from "../components/sidebar/app-sidebar";
import {Button} from "../ui/button";
import api from "../utils/Api";

export const iframeHeight = "800px"

export const description = "An inset sidebar with secondary navigation."

const getBreadcrumb = (pathname: string) => {
    switch (pathname) {
        case "/":
            return [
                { href: "/projects", label: "Projects" }
            ]
        case "/projects":
            return [
                { href: "/projects", label: "Projects" }
            ]
        case "/orders":
            return [
                { href: "/orders", label: "Orders" }
            ]
        case "/hauliers":
            return [
                { href: "/hauliers", label: "Transportistas" }
            ]
        case "/customers":
            return [
                { href: "/customers", label: "Clientes" }
            ]
        default:
            return []
    }
}


const RootLayout = () => {

    const navigate = useNavigate();
    const pathname = useLocation().pathname
    const [breadcumb , setBreadcrumb] = React.useState([])

    useEffect(() => {
        if(pathname.includes('/order/')) {
            const orderId = pathname.split('/').pop()
            api.get('/orders/' + orderId).then((res) => {
                setBreadcrumb([
                    ...breadcumb,
                    { href: pathname, label: res.orderNumber }
                ])
            }).catch((err) => {
                setBreadcrumb(getBreadcrumb(pathname))
            })
        }
        else if(pathname.includes('/project/')) {
            const projectId = pathname.split('/').pop()
            api.get('/projects/' + projectId).then((res) => {
                setBreadcrumb([
                    { href: "/projects", label: "Projects" },
                    { href: pathname, label: res.projectNumber }
                ])
            }).catch((err) => {
                setBreadcrumb(getBreadcrumb(pathname))
            })
        }
        else if(pathname.includes('/haulier/')) {
            const haulierId = pathname.split('/').pop()
            api.get('/hauliers/' + haulierId).then((res) => {
                setBreadcrumb([
                    { href: "/hauliers", label: "Transportistas" },
                    { href: pathname, label: res.companyName }
                ])
            }).catch((err) => {
                setBreadcrumb(getBreadcrumb(pathname))
            })
        }
        else if(pathname.includes('/customer/')) {
            const customerId = pathname.split('/').pop()
            api.get('/customers/' + customerId).then((res) => {
                setBreadcrumb([
                    { href: "/customers", label: "Clientes" },
                    { href: pathname, label: res.name }
                ])
            }).catch((err) => {
                setBreadcrumb(getBreadcrumb(pathname))
            })
        }
        setBreadcrumb(getBreadcrumb(pathname))
    }, [navigate]);

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
                        <div className="flex items-center gap-2 px-4 ">
                            <SidebarTrigger className="-ml-1"/>
                            <Separator orientation="vertical" className="mr-2 h-4"/>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <Link to="/">
                                            IMAE
                                        </Link>
                                    </BreadcrumbItem>
                                    {breadcumb.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <BreadcrumbSeparator/>
                                            <BreadcrumbItem>
                                                <Link to={item.href}>
                                                    {item.label}
                                                </Link>
                                            </BreadcrumbItem>
                                        </React.Fragment>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="flex items-center gap-2 px-4">
                            <Button onClick={() => navigate(-1)} variant="ghost" size="icon" className="h-8 w-8 p-0" >
                                <ArrowLeftFromLine />
                            </Button>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Outlet/>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
export default RootLayout;
