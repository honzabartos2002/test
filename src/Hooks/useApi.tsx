import axios, { AxiosInstance } from "axios";
import { useCallback, useMemo } from "react";
import delay from "../Shared/delay";
import { useTranslation } from "react-i18next";
import { SingletonRefreshClient } from "../Api/SingletonRefreshClient";



export function useApi<T>(ApiClass: new (url: string, axios: AxiosInstance) => T) {
  const { i18n } = useTranslation();
  // const { currentLanguage } = useLocalization(); // use your hook

  const GetApiAddress = useCallback((): string => {
    console.log(process.env.REACT_APP_API_URL);
    return process.env.REACT_APP_API_URL!;
  }, []);
  const Unauthorized = useCallback((): T => {
    const axiosApiInstance = axios.create();

    axiosApiInstance.interceptors.request.use(
      async config => {
        config.headers["Content-Type"] = 'application/json';
        config.headers["Accept"] = 'application/json';
        config.headers["accept-language"] = i18n.language;
        config.headers["TimeZone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;

        return config;
      },
      error => {
        Promise.reject(error)
      });

    const apiInstance = new ApiClass(GetApiAddress(), axiosApiInstance);
    if (!apiInstance) {
      throw new Error("Failed to create Unauthorized API instance");
    }
    return apiInstance;
  }, [ApiClass, i18n.language, GetApiAddress]);

  const unauthorizedApi = useMemo(() => {
    let apiInstance = Unauthorized();
    return apiInstance;
  }, [Unauthorized]);
  const Authorized = useCallback((): T => {
    const axiosApiInstance = axios.create();

    axiosApiInstance.interceptors.request.use(
      async config => {
        let token = localStorage.getItem('token');
        if (token === null) token = localStorage.getItem('partner_token');
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Accept = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        config.headers['accept-language'] = i18n.language;
        config.headers['TimeZone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

        return config;
      },
      error => {
        Promise.reject(error)
      });
    axiosApiInstance.interceptors.response.use((response) => {
      return response
    }, async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {

        try {
          if (error.response.headers['is-token-expired'] === 'true') {
            if (!SingletonRefreshClient.isRefreshing) {
              SingletonRefreshClient.setRefresh();
              originalRequest._retry = true;
              try {
                await SingletonRefreshClient.refreshToken();
              }
              catch (e) {

                console.log(e);
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                window.location.href = window.location.origin;

              }
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('bearer');
              SingletonRefreshClient.completeRefresh();
            }
            else delay(1500);
            return axiosApiInstance(originalRequest);


          }
          else throw new Error('unauthorized but refresh token not expires');
        }
        catch (e) {
          console.log('error refresh', e);
        }
      }
      return Promise.reject(error);
    });
    const apiInstance = new ApiClass(GetApiAddress(), axiosApiInstance);
    if (!apiInstance) {
      throw new Error("Failed to create Authorized API instance");
    }
    return apiInstance;
  }, [i18n.language, ApiClass, GetApiAddress]);
  const authorizedApi = useMemo(() => {
    let apiInstance = Authorized();
    return apiInstance;
  }, [Authorized]);


  const AuthorizedNoRedirect = useCallback((): T => {
    const axiosApiInstance = axios.create();

    // Request interceptor for API calls
    axiosApiInstance.interceptors.request.use(
      async config => {
        let token = localStorage.getItem('token');
        if (token === null) token = localStorage.getItem('partner_token');
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Accept = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        config.headers['accept-language'] = i18n.language;
        config.headers['TimeZone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

        return config;
      },
      error => {
        Promise.reject(error)
      });
    axiosApiInstance.interceptors.response.use((response) => {
      return response
    }, async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {

        try {
          if (error.response.headers['is-token-expired'] === 'true') {
            if (!SingletonRefreshClient.isRefreshing) {
              SingletonRefreshClient.setRefresh();
              originalRequest._retry = true;
              try {
                await SingletonRefreshClient.refreshToken();
              }
              catch (e) {

                console.log(e);
                // localStorage.removeItem('token');
                // localStorage.removeItem('refresh_token');
                // window.location.href = window.location.origin;

              }
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('bearer');
              SingletonRefreshClient.completeRefresh();
              return axiosApiInstance(originalRequest);
            }
            else delay(1500);


          }
          else throw new Error('unauthorized but refresh token not expires');
        }
        catch (e) {
          console.log('error refresh', e);
        }
      }
      return Promise.reject(error);
    });
    const apiInstance = new ApiClass(GetApiAddress(), axiosApiInstance);
    if (!apiInstance) {
      throw new Error("Failed to create Authorized API instance");
    }
    return apiInstance;
  }, [i18n.language, ApiClass, GetApiAddress]);
  const authorizedApiNoRedirect = useMemo(() => {
    let apiInstance = AuthorizedNoRedirect();
    return apiInstance;
  }, [AuthorizedNoRedirect]);

  return { unauthorizedApi, authorizedApi, Unauthorized, Authorized, authorizedApiNoRedirect };
}