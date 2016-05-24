import { fetchAccountsOnFetchMember, fetchAccountsOnSetPrimary, connect } from './accounts';
import { fetchConnectionsOnFetchMember, fetchConnectionsOnSetPrimary } from './connections';
import { fetchUsersOnFetchMember, fetchUsersOnSetPrimary, invited } from './users';
import { update, signedOn, reloaded, signedUp, verified, setPrimary, createMember, createFailed } from './members';

export default [ 
  fetchAccountsOnFetchMember, fetchAccountsOnSetPrimary, connect
, fetchConnectionsOnFetchMember, fetchConnectionsOnSetPrimary
, fetchUsersOnFetchMember, fetchUsersOnSetPrimary, invited
, update, signedOn, reloaded, verified, signedUp, setPrimary, createMember, createFailed 
];