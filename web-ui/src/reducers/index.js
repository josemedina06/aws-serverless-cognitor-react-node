import { combineReducers } from 'redux';
import user from './user';
import worksheet from './worksheet';
import analysis from './analysis';

export default combineReducers({
    user, worksheet, analysis
});