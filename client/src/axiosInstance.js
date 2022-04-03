import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'multipart/form-data' }
});

const pagination = {
    perPage: 1,
    pageNumber: 10
};

// instance.interceptors.request.use((config) => {
//     config.params = config.params || {};
//     config.params['pagination'] = pagination;
//     return config;
// });

export default instance;
