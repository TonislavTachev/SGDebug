import { UPLOAD_FILES, FETCH_REQUEST, GET_REQUEST, SET_FIELD } from '../actionTypes';
import API from '../axiosInstance';

export const uploadFiles = (files) => async (dispatch) => {
    try {
        let res = await API.post('/upload', files, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch({ type: UPLOAD_FILES, payload: res.data.msg });
    } catch (error) {}
};

export const fetchAllRequests = () => async (dispatch) => {
    const pagination = {
        perPage: 10,
        pageNumber: 1
    };

    try {
        let res = await API.post('/fetchRequests', pagination, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({ type: FETCH_REQUEST, payload: res.data });
    } catch (error) {}
};

export const filterRequests = () => async (dispatch) => {};

export const setField = (body) => (dispatch) => {
    console.log(body);
    dispatch({ type: SET_FIELD, payload: body });
};
export const getRequest = (request) => async (dispatch) => {
    dispatch({ type: GET_REQUEST, payload: request });
};
