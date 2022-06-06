import {
    UPLOAD_FILES,
    FETCH_REQUEST,
    GET_REQUEST,
    SET_FIELD,
    DELETE_FILE,
    TRACE_REQUEST,
    FETCH_DISTINCT_REQUEST_NAMES,
    FETCH_FILTERED_REQUEST,
    CLEAR_FILTERS
} from '../actionTypes';
import API from '../axiosInstance';

export const uploadFiles = (files) => async (dispatch) => {
    try {
        let res = await API.post('/files/upload', files, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.status === 200) {
            dispatch({ type: UPLOAD_FILES, payload: res.data.msg });
        }
    } catch (error) {}
};

export const fetchAllRequests =
    (pageNumber, requestType, distinctRequestName, filters) => async (dispatch) => {
        const pagination = {
            perPage: 10,
            pageNumber: pageNumber,
            requestType,
            distinctRequestName,
            filters
        };

        try {
            let res = await API.post('/requests/fetch', pagination, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch({ type: FETCH_REQUEST, payload: res.data, request: 'requests/fetch' });
        } catch (error) {}
    };

export const filterRequests = (filters) => async (dispatch) => {
    const filtersObj = {
        perPage: 10,
        pageNumber: 1,
        filters
    };

    try {
        const res = await API.post('/requests/filter', filtersObj, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({ type: FETCH_FILTERED_REQUEST, payload: res.result });
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

export const fetchDistinctRequestNamesByType = (requestType) => async (dispatch) => {
    const type = {
        requestType: requestType
    };
    try {
        let res = await API.post('/requests/filter/methodName', type, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch({ type: FETCH_DISTINCT_REQUEST_NAMES, payload: res.data });
    } catch (error) {}
};

export const setField = (body) => (dispatch) => {
    dispatch({ type: SET_FIELD, payload: body });
};

export const getRequest = (request) => async (dispatch) => {
    dispatch({ type: GET_REQUEST, payload: request });
};

export const traceRequestId = (requestId) => async (dispatch) => {
    try {
        let tracedRequest = await API.get(`/requests/get/${requestId}`);

        dispatch({ type: TRACE_REQUEST, payload: tracedRequest.data[0] });
    } catch (error) {}
};

export const clearFilters = () => async (dispatch) => {
    dispatch({ type: CLEAR_FILTERS });
};
