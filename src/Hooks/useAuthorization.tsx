
import { useContext } from "react";
import { AuthorizationContext } from "../Contexts/AuthorizationContext";

export interface UseAuthorization {
    isAuthenticated: boolean;
    isInitialized: boolean;
    login: (token: string, refreshToken: string) => void;
    logout: () => void;
    token: string | null | undefined;
}

export const useAuthorization = (): UseAuthorization => {
    const { isAuthenticated, isInitialized, login, logout, token } = useContext(AuthorizationContext);
    return { isAuthenticated, isInitialized, login, logout, token };
};