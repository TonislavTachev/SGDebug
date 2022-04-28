import { UPLOAD_FILES, FETCH_REQUEST, GET_REQUEST, SET_FIELD, DELETE_FILE } from '../actionTypes';
import API from '../axiosInstance';

export const uploadFiles = (files) => async (dispatch) => {
    try {
        let res = await API.post('/files/upload', files, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(res.data);

        if (res.status === 200) {
            return dispatch({ type: UPLOAD_FILES, payload: res.data.msg });
        }
    } catch (error) {
        return null;
    }
};

export const fetchAllRequests = (pageNumber, requestType) => async (dispatch) => {
    const pagination = {
        perPage: 10,
        pageNumber: pageNumber,
        requestType
    };

    try {
        let res = await API.post('/requests/fetch', pagination, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({ type: FETCH_REQUEST, payload: res.data });
    } catch (error) {}
};

export const filterRequests = (filters) => async (dispatch) => {
    const filtersObj = {
        perPage: 10,
        pageNumber: 1,
        filters
    };

    try {
        let res = await API.post('/requests/filter', filtersObj, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {}
};

export const removeLogFile = (fileName, fileId) => async (dispatch) => {
    const removeFileObj = {
        fileName: fileName
    };
    try {
        let res = await API.post('/files/delete', removeFileObj, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status === 200) {
            dispatch({ type: DELETE_FILE, payload: fileId });
        }
    } catch (error) {}
};

export const setField = (body) => (dispatch) => {
    dispatch({ type: SET_FIELD, payload: body });
};

export const getRequest = (request) => async (dispatch) => {
    dispatch({ type: GET_REQUEST, payload: request });
};
