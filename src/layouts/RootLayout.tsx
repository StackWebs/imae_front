import React from "react";
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

export const iframeHeight = "800px"

export const description = "An inset sidebar with secondary navigation."

const getBreadcrumb = (pathname: string) => {

    const originalPathname = pathname
    if(pathname.includes('/project/')) pathname = '/project'
    if(pathname.includes('/order/')) pathname = '/order'
    if(pathname.includes('/haulier/')) pathname = '/haulier'
    if(pathname.includes('/customer/')) pathname = '/customer'

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
        case "/project":
            return [
                { href: "/projects", label: "Projects" },
                { href: originalPathname, label: "Fixa Proyecto" }
            ]
        case "/order":
            return [
                { href: "/orders", label: "Orders" },
                { href: originalPathname, label: "Fixa Order" }
            ]
        case "/haulier":
            return [
                { href: "/hauliers", label: "Transportistas" },
                { href: originalPathname, label: "Fixa Transportista" }
            ]
        case "/customer":
            return [
                { href: "/customers", label: "Clientes" },
                { href: originalPathname, label: "Fixa Cliente" }
            ]
        default:
            return []
    }
}


const RootLayout = () => {

    const navigate = useNavigate();
    const breadcumb = getBreadcrumb(useLocation().pathname)

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
