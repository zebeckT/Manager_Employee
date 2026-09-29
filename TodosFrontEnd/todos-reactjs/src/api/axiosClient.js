import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    timeout: 300000,
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.log(error);
    }
);

instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default instance;
