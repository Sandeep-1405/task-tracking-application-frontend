import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function HOC(WrappedComponent) {
    return function AuthenticatedComponent() {
        const [isToken, setIsToken] = useState(null); 
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem('jwt'); 
            if (token) {
                setIsToken(true);
            } else {
                setIsToken(false);
            }
        }, []);

        if (isToken === null) {
            return <div>Loading...</div>; 
        }
        return isToken ? <WrappedComponent  /> : navigate('/login');
    };
}
