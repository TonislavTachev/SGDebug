import { FETCH_REQUEST, GET_REQUEST } from '../actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    requests: [],
    request: {}
});

export default function requestReducer(state = defaultState, { type, payload }) {
    switch (type) {
        case FETCH_REQUEST:
            return state.set('requests', payload);
        case GET_REQUEST:
            return state.set('request', payload);

        default:
            return state;
    }
}
