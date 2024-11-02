import React from "react";
import {Link, MemoryRouter, Outlet, Route, Routes} from "react-router-dom";
import Login from "../pages/Auth/Login";
import Expeditions from "../pages/Expeditions/Expeditions";


const RootLayout = () => {

    return (
        <>
            <Link to="expeditions" className="text-sm font-medium transition-colors hover:text-primary" >
                expeditions
            </Link>
            <Link to="auth/login" className="text-sm font-medium transition-colors hover:text-primary" >
                login
            </Link>
            <Outlet/>
        </>
    );
}
export default RootLayout;
