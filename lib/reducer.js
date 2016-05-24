import { combineReducers } from 'redux'; 
import members from './ducks/members';  
import accounts from './ducks/accounts';  
import connections from './ducks/connections';  
import users from './ducks/users';  
import search from './ducks/search';  

export default combineReducers({
  members
, accounts
, connections
, users
, search
});