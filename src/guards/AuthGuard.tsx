import React, {ReactNode, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { useStore } from "../store";

interface AuthGuardProps {
    component: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component }) => {
    const { user, clearUser } = useStore();
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        setStatus(!!user);
        if (!user) {
            clearUser();
            navigate("/auth/login");
        }
    }

    return status ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>;
};

export default AuthGuard;
