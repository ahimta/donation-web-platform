import { combineReducers } from 'redux';

import activity from './activity';
import donations from './donations';

export default combineReducers({ activity, donations });
