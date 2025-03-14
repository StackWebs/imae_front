import React, {ReactNode, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { useStore } from "../store";

interface AuthGuardProps {
    component: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component }) => {
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const user = localStorage.getItem("username");
        setStatus(!!user);
        if (!user) {
            navigate("/auth/login");
        }
    }

    return status ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>;
};

export default AuthGuard;
