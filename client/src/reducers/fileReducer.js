import { UPLOAD_FILES } from '../actionTypes';

const defaultState = {
    uploadedFiles: false
};

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case UPLOAD_FILES:
            return {
                ...state,
                uploadedFiles: true
            };

        default:
            return state;
    }
}
