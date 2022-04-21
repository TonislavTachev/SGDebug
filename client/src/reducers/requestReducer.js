import { FETCH_REQUEST, GET_REQUEST, SET_FIELD, DELETE_FILE } from '../actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    requests: [],
    fileNames: [],
    request: {},
    startDate: null,
    endDate: null,
    filters: {
        range: [null, null],
        time: {
            from: '',
            to: ''
        },
        types: 'swagger'
    },
    fileRemoved: false,
    pagination: {
        page: 1,
        perPage: 12,
        totalPages: 0
    }
});

export default function requestReducer(state = defaultState, { type, payload }) {
    switch (type) {
        case FETCH_REQUEST:
            return state
                .set('requests', payload.data)
                .set('startDate', payload.startDate)
                .set('endDate', payload.endDate)
                .set('fileNames', payload.fileNames)
                .setIn(['pagination', 'totalPages'], payload.totalPages);
        case GET_REQUEST:
            return state.set('request', payload);
        case SET_FIELD: {
            return state.setIn(payload.path, payload.value);
        }

        case DELETE_FILE: {
            return state.deleteIn(['fileNames', payload]).set('fileRemoved', true);
        }

        default:
            return state;
    }
}
