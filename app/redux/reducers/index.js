import { combineReducers } from 'redux';
import routes from './routes';
import auth from './auth';
import petition from './petition';
// ... other reducers

export default combineReducers({
  routes,
  auth,
  petition,
  // ... other reducers
});
