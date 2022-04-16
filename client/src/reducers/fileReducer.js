import { fromJS } from 'immutable';
import { UPLOAD_FILES } from '../actionTypes';

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

        default:
            return state;
    }
}
