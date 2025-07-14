import { createContext, useState, useEffect, ReactNode } from "react";

interface IAuthContext {
    token: string | null | undefined;
    isAuthenticated: boolean;
    isInitialized: boolean;
    login: (token: string, refreshToken: string) => void;
    logout: () => void;
}

export const AuthorizationContext = createContext<IAuthContext>({
    token: null,
    isAuthenticated: false,
    isInitialized: false,
    login: () => { },
    logout: () => { },
});

interface AuthorizationProviderProps {
    children: ReactNode;
}

export const AuthorizationProvider = ({ children }: AuthorizationProviderProps) => {
    const [token, setToken] = useState<string | null | undefined>(undefined);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const isAuthenticated = !!token;

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        else setToken(null);
    }, []);

    useEffect(() => {
        if (token !== undefined) {
            setIsInitialized(true);
        }
    }, [token]);

    const login = (newToken: string, refreshToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        localStorage.setItem('refresh_token', refreshToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    };

    return (
        <AuthorizationContext.Provider value={{ token, isAuthenticated, isInitialized, login, logout }}>
            {children}
        </AuthorizationContext.Provider>
    );
};
