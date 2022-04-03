import { fromJS } from 'immutable';
import { UPLOAD_FILES } from '../actionTypes';

const defaultState = fromJS({
    uploadedFiles: []
});

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case UPLOAD_FILES:
            return state.updateIn(['uploadedFiles'], (list) =>
                list.concat({ fileName: action.payload })
            );

        default:
            return state;
    }
}
