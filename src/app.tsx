import React, {useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import {
    MemoryRouter,
    Route,
    Routes
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import AuthGuard from "./guards/AuthGuard";
import SettingsLayout from "./layouts/SettingsLayout";
import Appearance from "./pages/Settings/Appearance/appearance";
import Profile from "./pages/Settings/Profile/profile";
import Orders from "./pages/Orders/Orders";
import Projects from "./pages/Projects/Projects";
import Project from "./pages/Project/Project";
import Hauliers from "./pages/Hauliers/Hauliers";
import Haulier from "./pages/Haulier/Haulier";
import Customer from "./pages/Customer/Customer";
import Customers from "./pages/Cutomers/Customers";
import Order from "./pages/Order/Order";
import Address from "./pages/Address/Address";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./pages/Providers/Providers";
import Provider from "./pages/Provider/Provider";
import Invoices from "./pages/Invoices/Invoices";
import Invoice from "./pages/Invoice/Invoice";

export default function App() {
    return (
        <>
            <html lang="en" className="light_blue" >
                <head />
                <body className={"min-h-screen bg-background font-sans antialiased"} >
                    <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                        <Routes>
                            <Route path="/" element={<AuthGuard component={<RootLayout/>}/>}>
                                <Route path="/" element={<AuthGuard component={<Projects/>}/>}/>
                                <Route path="/orders" element={<AuthGuard component={<Orders/>}/>}/>
                                <Route path="/order/:orderId" element={<AuthGuard component={<Order/>}/>}/>
                                <Route path="/projects" element={<AuthGuard component={<Projects/>}/>}/>
                                <Route path="/project/:projectId" element={<AuthGuard component={<Project/>}/>}/>
                                <Route path="/hauliers" element={<AuthGuard component={<Hauliers/>}/>}/>
                                <Route path="/haulier/:haulierId" element={<AuthGuard component={<Haulier/>}/>}/>
                                <Route path="/invoices" element={<AuthGuard component={<Invoices/>}/>}/>
                                <Route path="/invoice/:invoiceId" element={<AuthGuard component={<Invoice/>}/>}/>
                                <Route path="/customers" element={<AuthGuard component={<Customers/>}/>}/>
                                <Route path="/customer/:customerId" element={<AuthGuard component={<Customer/>}/>}/>
                                <Route path="/providers" element={<AuthGuard component={<Providers/>}/>}/>
                                <Route path="/provider/:providerId" element={<AuthGuard component={<Provider/>}/>}/>
                                <Route path="/address/:addressId" element={<AuthGuard component={<Address/>}/>}/>
                                <Route path="/settings" element={<AuthGuard component={<SettingsLayout/>}/>}>
                                    <Route path="/settings/" element={<AuthGuard component={<Profile/>}/>}/>
                                    <Route path="/settings/profile" element={<AuthGuard component={<Profile/>}/>}/>
                                    <Route path="/settings/appearance" element={<AuthGuard component={<Appearance/>}/>}/>
                                </Route>
                            </Route>
                            <Route path="/auth" element={<AuthLayout/>}>
                                <Route path="/auth/login" element={<Login/>}/>
                            </Route>
                        </Routes>
                    </MemoryRouter>
                    <>
                        <ToastContainer />
                    </>
                </body>
            </html>
        </>
    );
}

const root = createRoot(document.body);
root.render(<App />);
