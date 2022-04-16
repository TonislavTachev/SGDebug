import { fromJS } from 'immutable';
import { UPLOAD_FILES, SET_FIELD } from '../actionTypes';

const defaultState = fromJS({
    uploadedFiles: [],
    filesUploaded: false
});

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case UPLOAD_FILES:
            return state
                .updateIn(['uploadedFiles'], (list) => list.concat({ fileName: action.payload }))
                .set('filesUploaded', true);

        case SET_FIELD: {
            return state.setIn(action.payload.path, action.payload.value);
        }

        default:
            return state;
    }
}
