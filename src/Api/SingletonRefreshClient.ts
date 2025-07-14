import axios from "axios";
import { AuthTestClient, RefreshTokenRequest } from "./ApiServerHook";


export class SingletonRefreshClient {
    public static isRefreshing: boolean;
    private constructor() {
    }
    public static setRefresh() {
        this.isRefreshing = true;
    }
    public static completeRefresh() {
        this.isRefreshing = false;
    }
    public static async refreshToken(): Promise<void> {

        let tokens = (await this.GetClientToAuth().refreshToken(new RefreshTokenRequest({
            accessToken: localStorage.getItem('token')!,
            refreshToken: localStorage.getItem('refresh_token')!,
        })));
        if (tokens.accessToken === undefined) throw new Error('token is undefined');
        localStorage.setItem('token', tokens.accessToken);
        localStorage.setItem('token_expires', tokens.expireAt?.toString()!);
        localStorage.setItem('refresh_token', tokens.refreshToken!);


    }
    
    private static GetClientToAuth(): AuthTestClient {
        const axiosApiInstance = axios.create();

        // Request interceptor for API calls
        axiosApiInstance.interceptors.request.use(
            async config => {
                // let culture = localStorage.getItem('i18nextLng');
                config.headers.set('TimeZone', Intl.DateTimeFormat().resolvedOptions().timeZone);
                // config.headers.set('accept-language', culture);
                config.headers.Accept = 'application/json';
                config.headers["Content-Type"] = 'application/json';

                return config;
            },
            error => {
                Promise.reject(error)
            });
        axiosApiInstance.interceptors.response.use((response) => {
            return response
        }, async function (error) {
            console.log('error', error);
            return Promise.reject(error);
        });
        return new AuthTestClient(this.GetApiAddress(), axiosApiInstance);
    }
    protected static GetApiAddress(): string {
        return process.env.REACT_APP_API_URL!;
    }

}