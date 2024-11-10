import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    MemoryRouter,
    Route,
    RouterProvider,
    Routes
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Expeditions from "./pages/Expeditions/Expeditions";
import Login from "./pages/Auth/Login";
import {ToastContainer} from "react-toastify";
import AuthLayout from "./layouts/AuthLayout";
import AuthGuard from "./guards/AuthGuard";
import SettingsLayout from "./layouts/SettingsLayout";
import Appearance from "./pages/Settings/Appearance/appearance";
import Profile from "./pages/Settings/Profile/profile";


export default function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/main_window" element={<RootLayout/>}>
                    <Route path="expeditions" element={<Expeditions/>}/>
                    <Route path="login" element={<Login/>}/>
                </Route>
            </>
        )
    );

    return (
        <>
            <html lang="en" className="dark" >
                <head />
                <body className={"min-h-screen bg-background font-sans antialiased"} >
                    <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                        <Routes>
                            <Route path="/" element={<AuthGuard component={<RootLayout/>}/>}>
                                <Route path="/" element={<AuthGuard component={<Expeditions/>}/>}/>
                                <Route path="/expeditions" element={<AuthGuard component={<Expeditions/>}/>}/>
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
                </body>
            </html>
        </>
    );
}

const root = createRoot(document.body);
root.render(<App />);
