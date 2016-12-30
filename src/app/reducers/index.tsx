import { combineReducers } from 'redux';

import activity from './activity';
import charities from './charities';
import currentUser from './currentUser';
import charity from './charity';
import donation from './donation';
import donations from './donations';
import user from './user';

export default combineReducers({ activity, charities, charity, currentUser, donation, donations, user });
