import axiosApiInstance from '../axiosInstance';

const dispatchRequestMiddleware = (store) => (next) => (action) => {
    if (action.request) {
        // Send an action with a request state of sent.
        action.state = 'sent';
        next(action);

        return axiosApiInstance(action.request, action.body, action.axiosConfig)
            .then((r) => {
                action.state = 'FINISHED';
                action.response = r;
                next(action);

                return action;
            })
            .catch((error) => {
                action.state = 'ERROR';
                action.response = error;

                next(action);
                return Promise.reject(action);
            });
    }

    return new Promise((resolve) => {
        next(action);
        resolve();
    });
};

export default dispatchRequestMiddleware;
