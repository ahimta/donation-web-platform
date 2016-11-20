import {combineReducers} from 'redux';
import todos from './todos.tsx';

const rootReducer = combineReducers({
  todos
});

export default rootReducer;
