import {
    FETCH_REQUEST,
    GET_REQUEST,
    SET_FIELD,
    DELETE_FILE,
    TRACE_REQUEST,
    FETCH_DISTINCT_REQUEST_NAMES,
    FETCH_FILTERED_REQUEST,
    CLEAR_FILTERS
} from '../actionTypes';
import { fromJS, Map } from 'immutable';

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
    },
    tracedRequest: {},
    isRequestTraced: null,
    distinctMethodNames: [],
    selectedDistinctName: { label: '', value: '' }
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

        case FETCH_FILTERED_REQUEST:
            return state.set('requests', payload);

        case FETCH_DISTINCT_REQUEST_NAMES: {
            return state.set(
                'distinctMethodNames',
                payload.map((item) => {
                    return { label: item.distinctName, value: item.distinctName };
                })
            );
        }

        case DELETE_FILE: {
            return state.deleteIn(['fileNames', payload]).set('fileRemoved', true);
        }

        case TRACE_REQUEST: {
            return state.set('tracedRequest', payload).set('isRequestTraced', true);
        }

        case CLEAR_FILTERS: {
            return state
                .setIn(['filters', 'range'], [null, null])
                .setIn(['filters', 'time', 'from'], '')
                .setIn(['filters', 'time', 'to'], '');
        }

        default:
            return state;
    }
}
