import { combineReducers } from 'redux/';
import fileReducer from './fileReducer';
import requestReducer from './requestReducer';

export default combineReducers({
    fileReducer,
    requestReducer
});
