import { combineReducers } from 'redux'; 
import members from './ducks/members';  
import accounts from './ducks/accounts';  
import users from './ducks/users';  
import search from './ducks/search';  

export default combineReducers({
  members
, accounts
, users
, search
});