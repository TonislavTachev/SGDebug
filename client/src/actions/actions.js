import { UPLOAD_FILES, FETCH_REQUEST } from '../actionTypes';
import API from '../axiosInstance';

export const uploadFiles = (files) => async (dispatch) => {
    try {
        API.post('/upload', files, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch({ type: UPLOAD_FILES });
    } catch (error) {}
};

export const fetchAllRequests = () => async (dispatch) => {
    try {
        let res = await API.get('/fetchRequests', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({ type: FETCH_REQUEST, payload: res.data.data });
    } catch (error) {}
};
