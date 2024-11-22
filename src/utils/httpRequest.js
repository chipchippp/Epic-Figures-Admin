import axios from 'axios';
import getBaseUrl from './baseUrl';
import { toast } from 'react-toastify';

export const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const createHttpRequest = (service) => {
    const httpRequest = axios.create({
        baseURL: getBaseUrl(service),
    });

    httpRequest.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    httpRequest.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // if (error.response && error.response.status === 401 && error.response.status === 403) {
            //     localStorage.clear();
            //     localStorage.removeItem('accessToken');
            //     localStorage.removeItem('refreshToken');
            //     localStorage.removeItem('roles');
            //     localStorage.removeItem('id');
            //     localStorage.removeItem('username');
            //     toast.error('Session expired. Please log in again.');
            //     window.location.href = '/login';
            // }
            return Promise.reject(error);
        },
    );

    return httpRequest;
};

export const get = async (service, path, options = {}) => {
    const httpRequest = createHttpRequest(service);
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (service, path, data, options = {}) => {
    const httpRequest = createHttpRequest(service);
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export const put = async (service, path, data, options = {}) => {
    const httpRequest = createHttpRequest(service);
    const response = await httpRequest.put(path, data, options);
    return response.data;
};

export const del = async (service, path, options = {}) => {
    const httpRequest = createHttpRequest(service);
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};
