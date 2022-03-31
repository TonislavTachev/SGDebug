import { FETCH_REQUEST } from '../actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    requests: []
});

export default function requestReducer(state = defaultState, { type, payload }) {
    switch (type) {
        case FETCH_REQUEST:
            return state.set('requests', payload);

        default:
            return state;
    }
}
