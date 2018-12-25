import { combineReducers } from 'redux';
import ActiveEnvReducer from './ActiveEnvReducer';
import UserInfoReducer from './UserInfoReducer';


const AppReducer = combineReducers({
    ActiveEnvReducer,
    UserInfoReducer
  });
export default AppReducer;