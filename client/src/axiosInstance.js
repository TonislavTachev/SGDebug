import axios from 'axios';

const instance = axios.create({
    baseURL: 'api',
    headers: { 'Content-Type': 'multipart/form-data' }
});

instance.interceptors.request.use(
    function (config) {
        // spinning start to show
        // UPDATE: Add this code to show global loading indicator
        document.body.classList.add('loading-indicator');

        const token = window.localStorage.token;
        if (token) {
            config.headers.Authorization = `token ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        // spinning hide
        // UPDATE: Add this code to hide global loading indicator
        document.body.classList.remove('loading-indicator');

        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// instance.interceptors.request.use((config) => {
//     config.params = config.params || {};
//     config.params['pagination'] = pagination;
//     return config;
// });

export default instance;
