import { combineReducers } from 'redux';

import activity from './activity';
import charities from './charities';
import donations from './donations';

export default combineReducers({ activity, charities, donations });
