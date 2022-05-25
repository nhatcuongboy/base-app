import { combineReducers } from 'redux';
import appReducer from './appSlice';
import authReducer from 'src/features/auth/authSlice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer
});

export default rootReducer;
