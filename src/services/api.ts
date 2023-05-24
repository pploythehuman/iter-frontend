import axios, { AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
  baseURL: "http://dev.se.kmitl.ac.th:1337/api/",
});

export const handleResponse = async <T = any>(responsePromise: Promise<AxiosResponse<T>>): Promise<{ status: number; data?: T }> => {
  try {
    const response = await responsePromise;
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      return {
        status: error.response?.status || 500,
        data: error.response?.data,
      };
    } else {
      return {
        status: 500,
        // data: 'An unknown error occurred',
      };
    }
  }
};

api.interceptors.request.use((config) => {
  const excludedEndpoints = [
    'user/login/',
    'user/register/',
    'user/password-reset/',
  ];

  const urlWithoutBase = config.url?.replace(config.baseURL || '', '');

  if (!excludedEndpoints.some((endpoint) => urlWithoutBase?.endsWith(endpoint))) {
    const token = localStorage.getItem('auth');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export const apiGet = <T = any>(url: string, params?: any): Promise<{ status: number; data?: T }> => {
  return handleResponse(api.get<T>(url, { params }));
};

export const apiPost = <T = any, R = any>(url: string, data?: T): Promise<{ status: number; data?: R }> => {
  return handleResponse(api.post<R>(url, data));
};

export const apiPatch = <T = any, R = any>(url: string, data?: T): Promise<{ status: number; data?: R }> => {
  return handleResponse(api.patch<R>(url, data));
};

export const apiPut = <T = any, R = any>(url: string, data?: T): Promise<{ status: number; data?: R }> => {
  return handleResponse(api.put<R>(url, data));
};

export const apiDelete = <T = any>(url: string): Promise<{ status: number; data?: T }> => {
  return handleResponse(api.delete<T>(url));
};

export default api;
