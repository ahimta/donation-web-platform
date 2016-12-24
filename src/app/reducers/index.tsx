import { combineReducers } from 'redux';

import activity from './activity';
import charities from './charities';
import charity from './charity';
import donation from './donation';
import donations from './donations';

export default combineReducers({ activity, charities, charity, donation, donations });
